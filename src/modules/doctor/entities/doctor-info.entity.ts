import { generateUUID } from "../../../utils/generateUUID";
import { CustomError } from "../../../errors/custom.error";

export type DoctorInfoProps = {
  duration: number;
  price: number;
  doctorId: string;
};

export class DoctorInfo {
  id: string;
  duration: number;
  price: number;
  doctorId: string;

  private constructor(props: DoctorInfoProps) {
    if (!props.doctorId) {
      throw new CustomError("Doctor does not exists", 404, "DOCTOR_NOT_EXISTS");
    }

    if (props.duration <= 0) {
      throw new CustomError("Invalid duration", 400, "INVALID_DURATION");
    }

    this.id = generateUUID();
    this.duration = props.duration;
    this.price = props.price;
    this.doctorId = props.doctorId;
  }

  static create(data: DoctorInfoProps) {
    const doctor = new DoctorInfo(data);
    return doctor;
  }
}
