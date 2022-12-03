import DoctorModel from "../doctor.model";
import { prismaMock } from "../../../helpers/singleton";

const MOCKED_DOCTORS = [
  {
    id: 1,
    name: "Caio César",
    crm: "22222",
    speciality: "Pediatra",
    user_id: 1,
  },
  {
    id: 2,
    name: "Miguel Scatolin",
    crm: "33333",
    speciality: "Cirurgião",
    user_id: 2,
  },
];

describe("Doctor Model Tests", () => {
  it("retrieveDoctors should return all registered doctors", async () => {
    const doctorModel = new DoctorModel();
    prismaMock.doctor.findMany.mockResolvedValue(MOCKED_DOCTORS);

    const result = await doctorModel.retrieveDoctors();

    expect(result).toEqual(MOCKED_DOCTORS);
  });

  it("retrieveDoctorById should return an doctor with the selected ID", async () => {
    const doctorModel = new DoctorModel();
    prismaMock.doctor.findUnique.mockResolvedValue(MOCKED_DOCTORS[0]);

    const result = await doctorModel.retrieveDoctorById(MOCKED_DOCTORS[0].id);

    expect(result).toBe(MOCKED_DOCTORS[0]);
  });

  it("deleteDoctor should return the deleted doctor", async () => {
    const doctorModel = new DoctorModel();
    prismaMock.doctor.delete.mockResolvedValue(MOCKED_DOCTORS[0]);

    const result = await doctorModel.deleteDoctor(MOCKED_DOCTORS[0].id);

    expect(result).toBe(MOCKED_DOCTORS[0]);
  });

  it("createDoctor should return the created doctor", async () => {
    const doctorModel = new DoctorModel();
    prismaMock.doctor.create.mockResolvedValue(MOCKED_DOCTORS[0]);

    const result = await doctorModel.createDoctor(MOCKED_DOCTORS[0]);

    expect(result).toBe(MOCKED_DOCTORS[0]);
  });

  it("editDoctor should return the updated doctor", async () => {
    const doctorModel = new DoctorModel();
    const expectedResult = { ...MOCKED_DOCTORS[0], speciality: "Neurologista" };
    prismaMock.doctor.update.mockResolvedValue(expectedResult);

    const result = await doctorModel.editDoctor(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
