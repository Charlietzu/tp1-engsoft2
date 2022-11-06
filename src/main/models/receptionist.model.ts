import type { Receptionist } from '@prisma/client'
import prisma from '../../database/client'

export default class ReceptionistModel {
  public async retrieveReceptionists() {
    return await prisma.receptionist.findMany()
  }

  public async retrieveReceptionistById(id: number) {
    return await prisma.receptionist.findUnique({ where: { id } })
  }

  public async createReceptionist(Receptionist: Receptionist) {
    return await prisma.receptionist.create({ data: { ...Receptionist } })
  }

  public async deleteReceptionist(id: number) {
    return await prisma.receptionist.delete({ where: { id } })
  }

  public async editReceptionist(
    id: number,
    Receptionist: Partial<Omit<Receptionist, 'id'>>
  ) {
    return await prisma.receptionist.update({
      where: { id },
      data: { ...Receptionist },
    })
  }
}
