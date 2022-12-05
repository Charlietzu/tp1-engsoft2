import app from "../../app";
import prisma from '../src/client';
import { Doctor } from '@prisma/client';
import { createDoctor, deleteDoctor } from '../../models/doctor.model';

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
    const doctors = prisma.doctor.deleteMany()

    await prisma.$transaction9[
        doctors
    ]

    await prisma.$disconnect()
})

it('should create 1 new appointment', async () => {
    const doctor: Doctor = {
        id: 1,
        name: "Caio César",
        crm: "22222",
        speciality: "Pediatra",
        user_id: 1,
    }

    await createDoctor(doctor)

    const newDoctor = await prisma.doctor.findUnique({
        where: {
            id: doctor.id,
        }
    })

    expect(newDoctor).toEqual(doctor)
})


it('should delete appointment ', async () => {
    let idToDelete = 1

    const doctor: Doctor = {
        id: idToDelete,
        name: "Caio César",
        crm: "22222",
        speciality: "Pediatra",
        user_id: 1,
    }

    await createDoctor(doctor)

    console.log(doctor.id)

    await deleteDoctor(idToDelete)

    expect(doctor).not.toHaveProperty('id', 1)
})