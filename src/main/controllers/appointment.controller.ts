import { Appointment } from '@prisma/client'
import type { Response, Request } from 'express'
import AppointmentModel from "../models/appointment.model";
import PatientModel from '../models/patient.model'

export default class AppointmentController {
  public async getAppointments(_req: Request, res: Response) {
    const result = await new AppointmentModel().retrieveAppointments();
    return res.status(200).send(result);
  }

  public async getAppointmentById(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Appointment, "id">>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params;

    if (!id) return res.status(400).send(null);

    const result = await new AppointmentModel().retrieveAppointmentById(id);

    if (!result) return res.status(404).send(null);

    return res.status(200).send(result);
  }

  public async getPatientAppointments(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params;

    if (!id) return res.status(400).send(null);

    const patient = await new PatientModel().retrievePatientById(id);

    if (!patient) return res.status(404).send(null);

    const result = await new AppointmentModel().retrievePatientAppointments(id);

    if (result?.length === 0) return res.status(404).send(null);

    return res.status(200).send(result);
  }

  static async getAppointmentsWithSameDoctorAndTime(
    doctorId: number | undefined,
    timestamp: Date | undefined,
    appointmentModel: AppointmentModel
  ) {
    if (!doctorId || !timestamp) return [];

    const appointments: Appointment[] =
      await appointmentModel.retrieveAppointments();

    return appointments.filter(
      (a) => a.timestamp.toISOString() === timestamp && a.doctor_id === doctorId
    );
  }

  public async createAppointment(
    req: Request<unknown, unknown, Appointment, unknown>,
    res: Response
  ) {
    const body = req.body;

    if (!body) return res.status(400).send(null);

    const appointmentModel = new AppointmentModel();

    const conflitctingAppointments =
      await AppointmentController.getAppointmentsWithSameDoctorAndTime(
        body.doctor_id,
        body.timestamp,
        appointmentModel
      );

    if (conflitctingAppointments.length)
      return res.status(400).send("Double appointment for doctor");

    const result = await appointmentModel.createAppointment(body);

    if (!result) return res.status(500).send(null);

    return res.status(200).send(result);
  }

  public async editAppointment(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Appointment, "id">>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params;
    const body = req.body;

    if (!id || !body) return res.status(400).send(null);

    const appointmentModel = new AppointmentModel();

    const conflitctingAppointments =
      await AppointmentController.getAppointmentsWithSameDoctorAndTime(
        body.doctor_id,
        body.timestamp,
        appointmentModel
      );

    if (conflitctingAppointments.some((appointment) => appointment.id !== id))
      return res.status(400).send("Double appointment for doctor");

    const result = await appointmentModel.editAppointment(id, body);

    if (!result) return res.status(500).send(null);

    return res.status(200).send(result);
  }

  public async deleteAppointment(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params;

    if (!id) return res.status(400).send(null);

    const result = await new AppointmentModel().deleteAppointment(id);

    if (!result) return res.status(500).send(null);

    return res.status(200).send(result);
  }
}
