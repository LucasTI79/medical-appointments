import { describe, test, expect, beforeAll } from "vitest";
import { randomUUID } from "crypto";
import {
  CreateDoctorRequest,
  CreateDoctorUseCase,
} from "./create-doctor.usecase";
import { UserMemoryRepository } from "../../../users/repositories/implementations/user.memory.repository";
import { DoctorMemoryRepository } from "../../repositories/implementations/in-memory/doctor.memory.repository";
import { SpecialityMemoryRepository } from "../../../speciality/repositories/implementations/speciality.memory.repository";
import { Speciality } from "../../../speciality/entity/speciality.entity";

describe("Create Doctor Use Case", () => {
  let specialityRepository: SpecialityMemoryRepository;
  let speciality: Speciality;
  beforeAll(async () => {
    specialityRepository = new SpecialityMemoryRepository();

    speciality = Speciality.create({
      description: "DESC_TEST",
      name: "NAME_TEST",
    });

    await specialityRepository.save(speciality);
  });

  test("Should be able to create a new Doctor", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email@email.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialityRepository
    );

    const doctorCreated = await createDoctorUseCase.execute(doctorMock);
    expect(doctorCreated).toHaveProperty("id");
  });

  test("Should not be able to create a new Doctor with exists CRM", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email@email.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const doctorMockDuplicated: CreateDoctorRequest = {
      username: "username_duplicated",
      name: "name_duplicated",
      password: "password_duplicated",
      email: "email_duplicated@email.com",
      crm: "123456",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialityRepository
    );

    await createDoctorUseCase.execute(doctorMock);
    expect(async () => {
      await createDoctorUseCase.execute(doctorMockDuplicated);
    }).rejects.toThrowError("CRM already exists");
  });

  test("Should not be able to create a new Doctor with CRM length invalid", async () => {
    const userRepository = new UserMemoryRepository();
    const doctorRepository = new DoctorMemoryRepository();

    const doctorMock: CreateDoctorRequest = {
      username: "username",
      name: "name",
      password: "password",
      email: "email@email.com",
      crm: "12345",
      specialityId: speciality.id,
    };

    const createDoctorUseCase = new CreateDoctorUseCase(
      doctorRepository,
      userRepository,
      specialityRepository
    );

    expect(async () => {
      await createDoctorUseCase.execute(doctorMock);
    }).rejects.toThrow("CRM length is incorrect");
  });
});
