export type TReels = {
  uuid: string;
  fileName: string;
  fileUrl: string;
  title?: string;
  content?: string;
  user?: {
    uuid: string;
    fullName: string;
    email: string;
    picture?: string;
  };
  createdAt: string;
  updatedAt: string;
};
