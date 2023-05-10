import { CustomError } from "../../../errors/custom.error";
import { compareTimeEndIsAfter, validateTime } from "../../../utils/date";
import { generateUUID } from "../../../utils/generateUUID";

type DoctorScheduleProps = {
  doctorId: string;
  schedules: Schedules[];
};

type Schedules = {
  endAt: string;
  startAt: string;
  dayOfWeek: number;
  id?: string;
};

export class DoctorSchedule {
  doctorId: string;
  schedules: Schedules[];
  id: string;

  private constructor(props: DoctorScheduleProps) {
    if (!props.schedules) {
      throw new CustomError("Invalid schedules", 400);
    }

    validateDuplicateSchedules(props.schedules);
    validateTimes(props.schedules);

    if (!props.doctorId) {
      throw new CustomError("Invalid doctorId", 400);
    }

    this.doctorId = props.doctorId;
    this.schedules = createSchedules(props.schedules);
    this.id = generateUUID();
  }
  static create(data: DoctorScheduleProps) {
    const doctorSchedule = new DoctorSchedule(data);
    return doctorSchedule;
  }
}

const validateDuplicateSchedules = (schedules: Schedules[]) => {
  const hasUniqueValue = new Set(
    schedules.map((schedule) => schedule.dayOfWeek)
  );
  if (hasUniqueValue.size < schedules.length) {
    throw new CustomError("Duplicate day of week", 400);
  }
};

const validateTimes = (schedules: Schedules[]) => {
  schedules.forEach((schedule) => {
    if (!validateTime(schedule.startAt)) {
      throw new CustomError("Invalid StartAt", 400, "INVALID_DATE");
    }

    if (!validateTime(schedule.endAt)) {
      throw new CustomError("Invalid EndAt", 400, "INVALID_DATE");
    }

    if (!compareTimeEndIsAfter(schedule.startAt, schedule.endAt)) {
      throw new CustomError(
        "End time cannot be earlier than start time",
        400,
        "INVALID_DATE"
      );
    }
  });
};

const createSchedules = (schedules: Schedules[]) => {
  return schedules.map((schedule) => ({
    ...schedule,
    id: generateUUID(),
  }));
};
