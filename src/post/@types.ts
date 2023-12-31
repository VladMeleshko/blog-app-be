export type PostInfoResponse = {
  id: string;
  title: string;
  description: string | null;
  article: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
  };
};
