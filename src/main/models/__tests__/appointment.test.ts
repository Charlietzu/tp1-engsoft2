import { prismaMock } from "../../../helpers/singleton";
import { Appointment } from "@prisma/client";
import AppointmentModel from "../appointment.model";

const MOCKED_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    created_at: new Date(),
    timestamp: new Date(),
    doctor_id: 1,
    patient_id: 1,
    receptionist_id: 1,
    content: "Consulta do Daniel",
  },
  {
    id: 2,
    created_at: new Date(),
    timestamp: new Date(),
    doctor_id: 2,
    patient_id: 2,
    receptionist_id: 2,
    content: "Consulta do Victor",
  },
];

describe("Appointment Model Tests", () => {
  it("retrieveAppointments should return all registered appointments", async () => {
    const appointmentModel = new AppointmentModel();
    prismaMock.appointment.findMany.mockResolvedValue(MOCKED_APPOINTMENTS);

    const result = await appointmentModel.retrieveAppointments();

    expect(result).toEqual(MOCKED_APPOINTMENTS);
  });

  it("retrieveAppointmentById should return an appointment with the selected ID", async () => {
    const appointmentModel = new AppointmentModel();
    prismaMock.appointment.findUnique.mockResolvedValue(MOCKED_APPOINTMENTS[0]);

    const result = await appointmentModel.retrieveAppointmentById(
      MOCKED_APPOINTMENTS[0].id
    );

    expect(result).toBe(MOCKED_APPOINTMENTS[0]);
  });

  it("retrievePatientAppointments should return all scheduled patient appointments", async () => {
    const appointmentModel = new AppointmentModel();
    const expectedResult = [MOCKED_APPOINTMENTS[0]];
    prismaMock.appointment.findMany.mockResolvedValue(expectedResult);

    const result = await appointmentModel.retrievePatientAppointments(
      MOCKED_APPOINTMENTS[0].patient_id
    );

    expect(result).toBe(expectedResult);
  });

  it("deleteAppointment should return the deleted appointment", async () => {
    const appointmentModel = new AppointmentModel();
    prismaMock.appointment.delete.mockResolvedValue(MOCKED_APPOINTMENTS[0]);

    const result = await appointmentModel.deleteAppointment(
      MOCKED_APPOINTMENTS[0].id
    );

    expect(result).toBe(MOCKED_APPOINTMENTS[0]);
  });

  it("createAppointment should return the created appointment", async () => {
    const appointmentModel = new AppointmentModel();
    prismaMock.appointment.create.mockResolvedValue(MOCKED_APPOINTMENTS[0]);

    const result = await appointmentModel.createAppointment(
      MOCKED_APPOINTMENTS[0]
    );

    expect(result).toBe(MOCKED_APPOINTMENTS[0]);
  });

  it("editAppointment should return the updated appointment", async () => {
    const appointmentModel = new AppointmentModel();
    const expectedResult = { ...MOCKED_APPOINTMENTS[0], receptionist_id: 5 };
    prismaMock.appointment.update.mockResolvedValue(expectedResult);

    const result = await appointmentModel.editAppointment(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
