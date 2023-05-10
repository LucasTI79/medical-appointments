import { DoctorInfo } from "../../../entities/doctor-info.entity";
import { IDoctorInfoRepository } from "../../doctor-info.repository";

export class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
  doctorsInfo: DoctorInfo[] = [];
  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const index = this.doctorsInfo.findIndex(
      (doctorIndo) => doctorIndo.doctorId === data.doctorId
    );
    if (index >= 0) {
      const doctor = this.doctorsInfo[index];
      this.doctorsInfo[index] = {
        ...doctor,
        duration: data.duration,
        price: data.price,
        startAt: data.startAt,
        endAt: data.endAt,
      };
      data = this.doctorsInfo[index];
    } else {
      this.doctorsInfo.push(data);
    }
    return data;
  }
}
