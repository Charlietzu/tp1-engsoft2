import type { User } from '@prisma/client'
import prisma from '../../database/client'

export default class UserModel {
  public async retrieveUsers() {
    return await prisma.user.findMany()
  }

  public async retrieveUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  }

  public async createUser(user: User) {
    return await prisma.user.create({ data: { ...user } })
  }

  public async deleteUser(id: number) {
    return await prisma.user.delete({ where: { id } })
  }

  public async editUser(id: number, user: Partial<Omit<User, 'id'>>) {
    return await prisma.user.update({ where: { id }, data: { ...user } })
  }
}
