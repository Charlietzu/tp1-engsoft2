import app from "../../app";
import { Exam } from '@prisma/client';
import ExamModel from '../../models/exam.model';
import prisma from '../../../database/client';

beforeAll(async () => {
    await prisma.exam.createMany({
        data: [{
            id: 1,
            created_at: new Date(),
            doctor_id: 1,
            patient_id: 1,
            receptionist_id: 1,
            result: "RESULT 1",
        }]
    })

    console.log('first exam created')
})

afterAll(async () => {
    await prisma.$disconnect()
})

it('should create 1 new exam', async () => {
    const examModel = new ExamModel();
    const exam: Exam = {
        id: 1,
        created_at: new Date(),
        doctor_id: 1,
        patient_id: 1,
        receptionist_id: 1,
        result: "RESULT 1",
    }

    await examModel.createExam(exam)

    expect(examModel.retrieveExamById(1)).not.toBeNull()
})