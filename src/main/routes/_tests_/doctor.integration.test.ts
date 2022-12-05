import app from "../../app";
import { Doctor } from '@prisma/client';
import DoctorModel from '../../models/doctor.model';
import prisma from '../../../database/client';

beforeAll(async () => {
    await prisma.doctor.createMany({
        data: [{
            id: 1,
            name: "Caio César",
            crm: "22222",
            speciality: "Pediatra",
            user_id: 1,
        }]
    })

    console.log('first doctor created')
})

afterAll(async () => {
    await prisma.$disconnect()
})

it('should create 1 new doctor', async () => {
    const doctorModel = new DoctorModel();
    const doctor: Doctor = {
        id: 1,
        name: "Caio César",
        crm: "22222",
        speciality: "Pediatra",
        user_id: 1,
    }

    await doctorModel.createDoctor(doctor)

    expect(doctorModel.retrieveDoctorById(1)).not.toBeNull()
})
