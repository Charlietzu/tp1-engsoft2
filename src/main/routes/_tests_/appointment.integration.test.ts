import app from "../../app";
import { Appointment } from '@prisma/client';
import prisma from '../../../database/client';
import AppointmentModel from '../../models/appointment.model';

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
    await prisma.$disconnect()
})

it('should create 1 new appointment', async () => {
    const appointmentModel = new AppointmentModel();
    const appointment: Appointment = {
        id: 1,
        created_at: new Date(),
        timestamp: new Date(),
        doctor_id: 1,
        patient_id: 1,
        receptionist_id: 1,
        content: "Consulta do Daniel",
    }

    await appointmentModel.createAppointment(appointment)

    expect(appointmentModel.retrieveAppointmentById(1)).not.toBeNull()
})

it('should find appointment by id', async () => {
    const appointmentModel = new AppointmentModel();
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

    await appointmentModel.createAppointment(appointment)

    let retrievedAppointment = await appointmentModel.retrieveAppointmentById(idTofind)

    expect(retrievedAppointment).not.toBeNull()
})