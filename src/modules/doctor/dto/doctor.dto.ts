import { User } from "@prisma/client";

export type DoctorWithUserDTO = {
  crm: string;
  email: string;
  specialityId: string;
  userId: string;
  id: string;
  user: {
    name: string;
  };
};
