export type TCampaignStatus = "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELED";

export interface TCampaign {
  uuid: string;
  title: string;
  description: string;
  target_amount: string;
  current_amount: string;
  slug: string;
  image?: string[];
  status: TCampaignStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface CampaignPayload {
  uuid: string;
  title: Record<string, string>;
  description: Record<string, string>;
  target_amount: number;
  current_amount: string;
  slug: string;
  image: string[];
  status: TCampaignStatus;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
