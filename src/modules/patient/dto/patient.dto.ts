export type PatientWithUserDTO = {
  id: string;
  document: string;
  email: string;
  userId: string;
  user: {
    name: string;
  };
};
