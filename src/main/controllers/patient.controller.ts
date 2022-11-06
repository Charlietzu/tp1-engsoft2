import { Patient } from '@prisma/client'
import type { Response, Request } from 'express'
import PatientModel from '../models/patient.model'

export default class PatientController {
  public async getPatients(_req: Request, res: Response) {
    const result = await new PatientModel().retrievePatients()
    return res.status(200).send(result)
  }

  public async getPatientById(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Patient, 'id'>>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new PatientModel().retrievePatientById(id)

    if (!result) return res.status(404).send(null)

    return res.status(200).send(result)
  }

  public async createPatient(
    req: Request<unknown, unknown, Patient, unknown>,
    res: Response
  ) {
    const body = req.body

    if (!body) return res.status(400).send(null)

    const patientModel = new PatientModel()
    const allpatients = await patientModel.retrievePatients()
    if (allpatients.some((patient) => patient.cpf === body.cpf))
      return res.status(400).send('Patient with same CPF already exists')

    const result = await new PatientModel().createPatient(body)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }

  public async editPatient(
    req: Request<
      { id: number },
      unknown,
      Partial<Omit<Patient, 'id'>>,
      unknown
    >,
    res: Response
  ) {
    const { id } = req.params
    const body = req.body

    if (!id || !body) return res.status(400).send(null)

    const result = await new PatientModel().editPatient(id, body)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }

  public async deletePatient(
    req: Request<{ id: number }, unknown, unknown, unknown>,
    res: Response
  ) {
    const { id } = req.params

    if (!id) return res.status(400).send(null)

    const result = await new PatientModel().deletePatient(id)

    if (!result) return res.status(500).send(null)

    return res.status(200).send(result)
  }
}
