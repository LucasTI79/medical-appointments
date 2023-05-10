import { generateUUID } from "../../../utils/generateUUID";

export type AppointmentProps = {
  patientId: string;
  doctorId: string;
  date: Date;
};

export class Appointment {
  patientId: string;
  doctorId: string;
  id?: string;
  date: Date;
  rate?: string;
  note?: string;
  isFinished?: boolean;

  private constructor(props: AppointmentProps) {
    this.patientId = props.patientId;
    this.doctorId = props.doctorId;
    this.id = generateUUID();
    this.date = props.date;
  }

  static create(data: AppointmentProps): Appointment {
    const appointment = new Appointment(data);
    return appointment;
  }
}
