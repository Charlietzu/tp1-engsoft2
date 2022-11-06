import type { Router } from 'express'
import DoctorController from '../controllers/doctor.controller'

export default class DoctorRoute {
  private routes: Router
  private controller: DoctorController

  constructor(routes: Router, controller: DoctorController) {
    this.routes = routes
    this.controller = controller
  }
  public buildRoutes() {
    this.routes.get('/doctors', this.controller.getDoctors)
    this.routes.get('/doctor/:id', this.controller.getDoctorById)
    this.routes.post('/doctor', this.controller.createDoctor)
    this.routes.put('/doctor/:id', this.controller.editDoctor)
    this.routes.delete('/doctor/:id', this.controller.deleteDoctor)
  }
}
