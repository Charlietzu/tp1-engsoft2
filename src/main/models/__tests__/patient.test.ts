import { prismaMock } from "../../../helpers/singleton";
import { Patient } from "@prisma/client";
import PatientModel from "../patient.model";

const MOCKED_PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Daniel Gomes",
    cpf: "54002163075",
    user_id: 1,
  },
  {
    id: 2,
    name: "Victor Melo",
    cpf: "44249728013",
    user_id: 2,
  },
];

describe("Patient Model Tests", () => {
  it("retrievePatients should return all registered patients", async () => {
    const patientModel = new PatientModel();
    prismaMock.patient.findMany.mockResolvedValue(MOCKED_PATIENTS);

    const result = await patientModel.retrievePatients();

    expect(result).toEqual(MOCKED_PATIENTS);
  });

  it("retrievePatientById should return an patient with the selected ID", async () => {
    const patientModel = new PatientModel();
    prismaMock.patient.findUnique.mockResolvedValue(MOCKED_PATIENTS[0]);

    const result = await patientModel.retrievePatientById(
      MOCKED_PATIENTS[0].id
    );

    expect(result).toBe(MOCKED_PATIENTS[0]);
  });

  it("deletePatient should return the deleted patient", async () => {
    const patientModel = new PatientModel();
    prismaMock.patient.delete.mockResolvedValue(MOCKED_PATIENTS[0]);

    const result = await patientModel.deletePatient(MOCKED_PATIENTS[0].id);

    expect(result).toBe(MOCKED_PATIENTS[0]);
  });

  it("createPatient should return the created patient", async () => {
    const patientModel = new PatientModel();
    prismaMock.patient.create.mockResolvedValue(MOCKED_PATIENTS[0]);

    const result = await patientModel.createPatient(MOCKED_PATIENTS[0]);

    expect(result).toBe(MOCKED_PATIENTS[0]);
  });

  it("editPatient should return the updated patient", async () => {
    const patientModel = new PatientModel();
    const expectedResult = { ...MOCKED_PATIENTS[0], name: "João" };
    prismaMock.patient.update.mockResolvedValue(expectedResult);

    const result = await patientModel.editPatient(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
