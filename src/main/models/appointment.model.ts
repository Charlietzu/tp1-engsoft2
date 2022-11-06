import type { Appointment } from '@prisma/client'
import prisma from '../../database/client'

export default class AppointmentModel {
  public async retrieveAppointments() {
    return await prisma.appointment.findMany()
  }

  public async retrieveAppointmentById(id: number) {
    return await prisma.appointment.findUnique({ where: { id } })
  }

  public async createAppointment(Appointment: Appointment) {
    return await prisma.appointment.create({ data: { ...Appointment } })
  }

  public async retrievePatientAppointments(patientId: number) {
    return await prisma.appointment.findMany({
      where: { patient_id: patientId },
    })
  }

  public async deleteAppointment(id: number) {
    return await prisma.appointment.delete({ where: { id } })
  }

  public async editAppointment(
    id: number,
    Appointment: Partial<Omit<Appointment, 'id'>>
  ) {
    return await prisma.appointment.update({
      where: { id },
      data: { ...Appointment },
    })
  }
}
