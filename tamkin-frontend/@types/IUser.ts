export type TUserRole = "super_admin" | "admin" | "user";
export type TUserProvider = "system" | "google" | "facebook";

export type TUser = {
  _id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  provider: TUserProvider;
  picture?: string | null;
  role: TUserRole;
  nationality?: string | null;
  createdAt: string;
  updatedAt: string;
};
