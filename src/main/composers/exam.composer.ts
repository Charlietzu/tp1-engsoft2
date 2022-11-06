import type { Router } from 'express'
import ExamController from '../controllers/exam.controller'
import ExamRoute from '../routes/exam.route'

export default class ExamComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new ExamRoute(this.router, new ExamController()).buildRoutes()
  }
}
