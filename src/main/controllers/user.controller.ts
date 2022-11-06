import type { User } from '@prisma/client'
import type { Response, Request } from 'express'
import UserModel from '../models/user.model'

export default class UserController {
  public async getUsers(_req: Request, res: Response) {
    const result = await new UserModel().retrieveUsers()
    return res.status(200).send(result)
  }

  public async getUser(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    if (!id) throw new Error('Um id deve ser enviado')

    const result = await new UserModel().retrieveUserById(id)
    return res.status(200).send(result)
  }

  public async createUser(
    req: Request<unknown, unknown, User, unknown>,
    res: Response
  ) {
    const result = await new UserModel().createUser(req.body)
    return res.status(200).send(result)
  }

  public async editUser(
    req: Request<{ id: number }, unknown, Partial<Omit<User, 'id'>>, unknown>,
    res: Response
  ) {
    const { id } = req.params
    const result = await new UserModel().editUser(id, req.body)
    return res.status(200).send(result)
  }

  public async deleteUser(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params
    const result = await new UserModel().deleteUser(id)
    return res.status(200).send(result)
  }
}
