import { request } from "supertest";
import Knex from "knex";
import { Model } from "objection";
import { createAppointment, retrieveAppointmentById, deleteAppointment } from '../../models/appointment.model';
import app from "../../app";
import prisma from '../src/client';
import { Appointment } from '@prisma/client';

beforeAll(async () => {
    await prisma.appointment.createMany({
        data: [{
            id: 1,
            created_at: new Date(),
            timestamp: new Date(),
            doctor_id: 1,
            patient_id: 1,
            receptionist_id: 1,
            content: "Consulta do Daniel",
        }]
    })

    console.log('first appointment created')
})

afterAll(async () => {
    const appointments = prisma.appointment.deleteMany()

    await prisma.$transaction9[
        appointments
    ]

    await prisma.$disconnect()
})

it('should create 1 new appointment', async () => {
    const appointment: Appointment = {
        id: 1,
        created_at: new Date(),
        timestamp: new Date(),
        doctor_id: 1,
        patient_id: 1,
        receptionist_id: 1,
        content: "Consulta do Daniel",
    }

    await createAppointment(appointment)

    const newAppointment = await prisma.appointment.findUnique({
        where: {
            id: appointment.id,
        }
    })

    expect(newAppointment).toEqual(appointment)
})

it('should find appointment by id', async () => {
    let idTofind = 1

    const appointment: Appointment = {
        id: idTofind,
        created_at: new Date(),
        timestamp: new Date(),
        doctor_id: 1,
        patient_id: 1,
        receptionist_id: 1,
        content: "Consulta do Daniel",
    }

    await createAppointment(appointment)

    let retrievedAppointment = await retrieveAppointmentById(idTofind)

    expect(retrievedAppointment.id).toEqual(idTofind)
})

it('should delete appointment ', async () => {
    let idToDelete = 1

    const appointment: Appointment = {
        id: idToDelete,
        created_at: new Date(),
        timestamp: new Date(),
        doctor_id: 1,
        patient_id: 1,
        receptionist_id: 1,
        content: "Consulta do Daniel",
    }

    await createAppointment(appointment)

    console.log(appointment.id)

    await deleteAppointment(idToDelete)

    expect(appointment).not.toHaveProperty('id', 1)
})