import type { Router } from 'express'
import PatientController from '../controllers/patient.controller'
import PatientRoute from '../routes/patient.route'

export default class PatientComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new PatientRoute(this.router, new PatientController()).buildRoutes()
  }
}
