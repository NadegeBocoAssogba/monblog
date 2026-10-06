export type User = {
  id: string;
  name: string;
  email: string;
  password: string; //A revoir après
  role: "USER" | "ADMIN";
};