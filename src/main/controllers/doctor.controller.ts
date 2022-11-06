import { Doctor } from '@prisma/client'
import type { Response, Request } from 'express'
import DoctorModel from '../models/doctor.model'

export default class DoctorController {
  public async getDoctors(_req: Request, res: Response) {
    const result = await new DoctorModel().retrieveDoctors()
    return res.status(200).send(result)
  }

  public async getDoctorById(
    req: Request<{ id: number }, unknown, Partial<Omit<Doctor, 'id'>>, unknown>,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new DoctorModel().retrieveDoctorById(id)

    if (!result) return res.status(404).send(null)

    return res.status(200).send(result)
  }

  public async createDoctor(
    req: Request<unknown, unknown, Doctor, unknown>,
    res: Response
  ) {
    const body = req.body

    if (!body) return res.status(400).send(null)

    const doctorModel = new DoctorModel()
    const allDoctors = await doctorModel.retrieveDoctors()
    if (allDoctors.some((doctor) => doctor.crm === body.crm))
      return res.status(400).send('doctor with same CRM already exists')

    const result = await doctorModel.createDoctor(req.body)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }

  public async editDoctor(
    req: Request<{ id: number }, unknown, Partial<Omit<Doctor, 'id'>>, unknown>,
    res: Response
  ) {
    const { id } = req.params
    const body = req.body

    if (!id || !body) return res.status(400).send(null)

    const result = await new DoctorModel().editDoctor(id, body)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }

  public async deleteDoctor(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new DoctorModel().deleteDoctor(id)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }
}
