import { randomUUID } from "crypto";

export type DoctorProps = {
  crm: string;
  email: string;
  userId: string;
  specialityId: string;
};

export class Doctor {
  id: string;
  crm: string;
  email: string;
  userId: string;
  specialityId: string;

  private constructor(props: DoctorProps) {
    if (!props.crm) {
      throw new Error("CRM is required");
    }

    if (props.crm.length !== 6) {
      throw new Error("CRM length is incorrect");
    }

    if (!props.email) {
      throw new Error("Email is required");
    }

    this.id = randomUUID();
    this.crm = props.crm;
    this.email = props.email;
    this.userId = props.userId;
    this.specialityId = props.specialityId;
  }

  static create(props: DoctorProps) {
    return new Doctor(props);
  }
}
