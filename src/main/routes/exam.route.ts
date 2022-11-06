import type { Router } from 'express'
import ExamController from '../controllers/exam.controller'

export default class ExamRoute {
  private routes: Router
  private controller: ExamController

  constructor(routes: Router, controller: ExamController) {
    this.routes = routes
    this.controller = controller
  }
  public buildRoutes() {
    this.routes.get('/exams', this.controller.getExams)
    this.routes.get('/exam/:id', this.controller.getExamById)
    this.routes.post('/exam', this.controller.createExam)
    this.routes.put('/exam/:id', this.controller.editExam)
    this.routes.delete('/exam/:id', this.controller.deleteExam)
    this.routes.get('/exams/patients/:id', this.controller.getPatientExams)
  }
}
