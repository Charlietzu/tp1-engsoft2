import { prismaMock } from "../../../helpers/singleton";
import { Exam } from "@prisma/client";
import ExamModel from "../exam.model";

const MOCKED_EXAMS: Exam[] = [
  {
    id: 1,
    created_at: new Date(),
    doctor_id: 1,
    patient_id: 1,
    receptionist_id: 1,
    result: "RESULT 1",
  },
  {
    id: 2,
    created_at: new Date(),
    doctor_id: 2,
    patient_id: 2,
    receptionist_id: 2,
    result: "RESULT 2",
  },
];

describe("Exam Model Tests", () => {
  it("retrieveExams should return all registered exams", async () => {
    const examModel = new ExamModel();
    prismaMock.exam.findMany.mockResolvedValue(MOCKED_EXAMS);

    const result = await examModel.retrieveExams();

    expect(result).toEqual(MOCKED_EXAMS);
  });

  it("retrieveExamById should return an exam with the selected ID", async () => {
    const examModel = new ExamModel();
    prismaMock.exam.findUnique.mockResolvedValue(MOCKED_EXAMS[0]);

    const result = await examModel.retrieveExamById(MOCKED_EXAMS[0].id);

    expect(result).toBe(MOCKED_EXAMS[0]);
  });

  it("deleteExam should return the deleted exam", async () => {
    const examModel = new ExamModel();
    prismaMock.exam.delete.mockResolvedValue(MOCKED_EXAMS[0]);

    const result = await examModel.deleteExam(MOCKED_EXAMS[0].id);

    expect(result).toBe(MOCKED_EXAMS[0]);
  });

  it("createExam should return the created exam", async () => {
    const examModel = new ExamModel();
    prismaMock.exam.create.mockResolvedValue(MOCKED_EXAMS[0]);

    const result = await examModel.createExam(MOCKED_EXAMS[0]);

    expect(result).toBe(MOCKED_EXAMS[0]);
  });

  it("editExam should return the updated exam", async () => {
    const examModel = new ExamModel();
    const expectedResult = { ...MOCKED_EXAMS[0], result: "Positive" };
    prismaMock.exam.update.mockResolvedValue(expectedResult);

    const result = await examModel.editExam(1, expectedResult);

    expect(result).toBe(expectedResult);
  });
});
