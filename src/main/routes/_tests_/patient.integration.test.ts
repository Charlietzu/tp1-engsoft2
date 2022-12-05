import app from "../../app";
import { Patient } from '@prisma/client';
import PatientModel from '../../models/patient.model';
import prisma from '../../../database/client';

beforeAll(async () => {
    await prisma.patient.createMany({
        data: [{
            id: 1,
            name: "Daniel Gomes",
            cpf: "54002163075",
            user_id: 1,
        }]
    })

    console.log('first patient created')
})

afterAll(async () => {
    await prisma.$disconnect()
})

it('should create 1 new patient', async () => {
    const patientModel = new PatientModel();
    const patient: Patient = {
        id: 1,
        name: "Daniel Gomes",
        cpf: "54002163075",
        user_id: 1,
    }

    await patientModel.createPatient(patient)

    expect(patientModel.retrievePatientById(1)).not.toBeNull()
})