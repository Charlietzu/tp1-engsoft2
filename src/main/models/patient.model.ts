import type { Patient } from '@prisma/client'
import prisma from '../../database/client'

export default class PatientModel {
  public async retrievePatients() {
    return await prisma.patient.findMany()
  }

  public async retrievePatientById(id: number) {
    return await prisma.patient.findUnique({ where: { id } })
  }

  public async createPatient(patient: Patient) {
    return await prisma.patient.create({ data: { ...patient } })
  }

  public async deletePatient(id: number) {
    return await prisma.patient.delete({ where: { id } })
  }

  public async editPatient(id: number, patient: Partial<Omit<Patient, 'id'>>) {
    return await prisma.patient.update({ where: { id }, data: { ...patient } })
  }
}
