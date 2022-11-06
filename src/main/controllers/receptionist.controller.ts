import { Receptionist } from '@prisma/client'
import type { Response, Request } from 'express'
import ReceptionistModel from '../models/receptionist.model'

export default class ReceptionistController {
  public async getReceptionists(_req: Request, res: Response) {
    const result = await new ReceptionistModel().retrieveReceptionists()
    return res.status(200).send(result)
  }

  public async getReceptionistById(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Receptionist, 'id'>>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new ReceptionistModel().retrieveReceptionistById(id)

    if (!result) return res.status(404).send(null)

    return res.status(200).send(result)
  }

  public async createReceptionist(
    req: Request<unknown, unknown, Receptionist, unknown>,
    res: Response
  ) {
    const body = req.body

    if (!body) return res.status(400).send(null)

    const receptionistModel = new ReceptionistModel()
    const allreceptionists = await receptionistModel.retrieveReceptionists()
    if (allreceptionists.some((receptionist) => receptionist.cpf === body.cpf))
      return res.status(400).send('Receptionist with same CPF already exists')

    const result = await new ReceptionistModel().createReceptionist(body)

    if (!result) return res.status(500).send(null)
    
    return res.status(200).send(result)
  }

  public async editReceptionist(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Receptionist, 'id'>>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params
    const body = req.body

    if (!id || !body) return res.status(400).send(null)

    const result = await new ReceptionistModel().editReceptionist(id, req.body)

    if (!result) return res.status(500).send(null)
    
    return res.status(200).send(result)
  }

  public async deleteReceptionist(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new ReceptionistModel().deleteReceptionist(id)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }
}
