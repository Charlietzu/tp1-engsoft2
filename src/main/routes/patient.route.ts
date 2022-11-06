import type { Router } from 'express'
import PatientController from '../controllers/patient.controller'

export default class PatientRoute {
  private routes: Router
  private controller: PatientController

  constructor(routes: Router, controller: PatientController) {
    this.routes = routes
    this.controller = controller
  }
  public buildRoutes() {
    this.routes.get('/patients', this.controller.getPatients)
    this.routes.get('/patient/:id', this.controller.createPatient)
    this.routes.post('/patient', this.controller.createPatient)
    this.routes.put('/patient/:id', this.controller.editPatient)
    this.routes.delete('/patient/:id', this.controller.deletePatient)
  }
}
