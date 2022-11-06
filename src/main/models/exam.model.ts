import type { Exam } from '@prisma/client'
import prisma from '../../database/client'

export default class ExamModel {
  public async retrieveExams() {
    return await prisma.exam.findMany()
  }

  public async retrieveExamById(id: number) {
    return await prisma.exam.findUnique({ where: { id } })
  }

  public async createExam(Exam: Exam) {
    return await prisma.exam.create({ data: { ...Exam } })
  }

  public async deleteExam(id: number) {
    return await prisma.exam.delete({ where: { id } })
  }

  public async editExam(id: number, Exam: Partial<Omit<Exam, 'id'>>) {
    return await prisma.exam.update({
      where: { id },
      data: { ...Exam },
    })
  }

  public async retrievePatientExams(id: number) {
    return await prisma.exam.findMany({ where: { patient_id: id } })
  }
}
