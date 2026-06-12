# Database Seeder

This application includes a database seeder that automatically populates the PostgreSQL database with mock data. It is highly useful for development and testing.

## Running the Seeder

To execute the seeder, ensure your database is running and the `.env` file contains your database credentials. Then, inside the `tamkin-backend` directory, run:

```bash
npm run db:seed
```

## Generated Data

The seeder inserts records into the following models:
- **UserModel**: Creates 10 standard users and 1 Super Admin user.
- **Campaign**: Creates 5 campaigns with translated titles/descriptions and mock target/current amounts.
- **ReelModel**: Creates 15 reels associated randomly with generated users.
- **Payment**: Creates 20 payments associated randomly with generated campaigns and users (some payments are anonymous).

### Default Administrator Credentials

If an admin user does not already exist, the seeder creates one with the following credentials:
- **Email**: `admin@tamkin.com`
- **Password**: `AdminPassword123!`
- **Role**: `SUPER_ADMIN`

## Customizing the Seeder

The seeder logic is located at `src/DataBase/seed.ts`. It utilizes `@faker-js/faker` to generate realistic mock data.
To change the amount of data generated or the specific dummy values (like the admin password), edit the loops and configurations in `src/DataBase/seed.ts`.
