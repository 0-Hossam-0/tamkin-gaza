#!/bin/bash

set -e  # Exit on error
set -u  # Exit on undefined variable

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${RED}🚀 PRODUCTION DEPLOYMENT${NC}"
echo -e "${YELLOW}⚠️  This will deploy to PRODUCTION environment!${NC}"

# Confirmation prompt
read -p "Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}❌ Deployment cancelled${NC}"
    exit 0
fi

# Change to project directory
cd ~/tamkin-gaza || {
    echo -e "${RED}❌ Failed to change to project directory${NC}"
    exit 1
}

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    exit 1
fi

# 1) Pull latest code
echo -e "${YELLOW}📥 Pulling latest code from prod branch...${NC}"
git checkout prod
git pull origin prod

# 2) Check for uncommitted changes
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}❌ Error: Uncommitted changes detected. Commit or stash them first.${NC}"
    git status -s
    exit 1
fi

# 3) Show current commit
# echo -e "${BLUE}📌 Deploying commit:${NC}"
# git log -1 --oneline

# 4) Backup database (optional but recommended)
echo -e "${YELLOW}💾 Creating database backup...${NC}"
BACKUP_FILE="backup-prod-$(date +%Y%m%d-%H%M%S).sql"
docker compose exec -T postgres-prod pg_dump -U ${POSTGRES_PROD_USER:-tamkin} ${POSTGRES_PROD_DB:-tamkin_prod} > "$BACKUP_FILE" 2>/dev/null || echo "⚠️  Backup skipped (database might not be running)"

# 5) Build and deploy backend-prod
echo -e "${YELLOW}🔨 Building backend-prod...${NC}"
docker compose build --no-cache backend-prod

echo -e "${YELLOW}🚀 Deploying backend-prod...${NC}"
docker compose up -d --no-deps --force-recreate backend-prod

# Wait for backend to be healthy
echo -e "${YELLOW}⏳ Waiting for backend-prod to be ready...${NC}"
sleep 10

# 6) Build and deploy frontend-prod
echo -e "${YELLOW}🔨 Building frontend-prod...${NC}"
docker compose build --no-cache frontend-prod

echo -e "${YELLOW}🚀 Deploying frontend-prod...${NC}"
docker compose up -d --no-deps --force-recreate frontend-prod

# 7) Restart nginx to ensure routing is updated
echo -e "${YELLOW}🔄 Restarting nginx...${NC}"
docker compose restart nginx

# 8) Cleanup
echo -e "${YELLOW}🧹 Cleaning up unused images...${NC}"
docker image prune -f

# 9) Show status
echo -e "${YELLOW}📊 Container status:${NC}"
docker compose ps | grep -E "(backend-prod|frontend-prod|postgres-prod|nginx)"

# 10) Health check
echo -e "${YELLOW}🏥 Running health checks...${NC}"
sleep 5
curl -f http://localhost/health || echo -e "${RED}⚠️  Health check failed${NC}"

# 11) Show logs
echo -e "${YELLOW}📝 Recent logs:${NC}"
docker compose logs --tail=20 backend-prod frontend-prod

echo -e "${GREEN}✅ PRODUCTION deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Production site: http://tamkeengaza.org${NC}"
echo -e "${BLUE}💾 Database backup saved to: $BACKUP_FILE${NC}"
