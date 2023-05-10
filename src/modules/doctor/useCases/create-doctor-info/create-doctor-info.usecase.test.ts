import { describe, expect, test } from "vitest";
import dayjs from "dayjs";
import {
  CreateDoctorInfoRequest,
  CreateDoctorInfoUseCase,
} from "./create-doctor-info.usecase";
import { DoctorMemoryRepository } from "../../repositories/implementations/in-memory/doctor.memory.repository";
import { generateUUID } from "../../../../utils/generateUUID";
import { DoctorInfoMemoryRepository } from "../../repositories/implementations/in-memory/doctor-info.memory.repository";
import { DoctorInfo } from "../../entities/doctor-info.entity";

describe("Create doctor info", () => {
  test("Should not be able to create doctor info if doctor does not exists!", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoMock, "INVALID_USER_ID");
    }).rejects.toThrow("Doctor does not exists");
  });

  test("Should not be able to create doctor info if endAt is before startAt", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoMock, userId);
    }).rejects.toThrow("End time cannot be earlier than start time");
  });

  test("Should not be able to create doctor info if endAt is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      endAt: "99:99",
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoMock, userId);
    }).rejects.toThrow("Invalid EndAt");
  });

  test("Should not be able to create doctor info if startAt is invalid", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: "99:99",
      endAt: "18:00",
      price: 150,
      duration: 10,
    };

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfoMock, userId);
    }).rejects.toThrow("Invalid StartAt");
  });

  test("Should be able to create doctor info", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(
      doctorInfoMock,
      userId
    );

    expect(doctorInfoCreated).toBeInstanceOf(DoctorInfo);
    expect(doctorInfoCreated).toHaveProperty("id");
  });

  test("Should be able to update exists doctor info", async () => {
    const doctorRepository = new DoctorMemoryRepository();
    const doctorInfoRepository = new DoctorInfoMemoryRepository();
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    );

    const userId = generateUUID();

    await doctorRepository.save({
      crm: "123456",
      email: "doctor@test.com.br",
      id: generateUUID(),
      specialityId: generateUUID(),
      userId,
    });

    const doctorInfoMock: CreateDoctorInfoRequest = {
      startAt: dayjs().startOf("day").add(10, "hour").format("HH:mm"),
      endAt: dayjs().startOf("day").add(18, "hour").format("HH:mm"),
      price: 150,
      duration: 10,
    };

    const doctorInfoCreated = await createDoctorInfoUseCase.execute(
      doctorInfoMock,
      userId
    );

    const doctorInfoUpdated = await createDoctorInfoUseCase.execute(
      doctorInfoMock,
      userId
    );

    expect(doctorInfoCreated).toBeInstanceOf(DoctorInfo);
    expect(doctorInfoCreated).toHaveProperty("id");
    expect(doctorInfoUpdated).toHaveProperty("id");
    expect(doctorInfoCreated.id).toBe(doctorInfoUpdated.id);
  });
});
