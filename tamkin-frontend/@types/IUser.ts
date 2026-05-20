type TUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  country: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
  colorIdx: number;
};

export type { TUser };
