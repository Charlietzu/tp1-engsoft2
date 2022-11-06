import type { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller'

export default class AppointmentRoute {
  private routes: Router
  private controller: AppointmentController

  constructor(routes: Router, controller: AppointmentController) {
    this.routes = routes
    this.controller = controller
  }
  public buildRoutes() {
    this.routes.get('/appointments', this.controller.getAppointments)
    this.routes.get('/appointment/:id', this.controller.getAppointmentById)
    this.routes.get(
      '/appointment/patient/:id',
      this.controller.getPatientAppointments
    )
    this.routes.post('/appointment', this.controller.createAppointment)
    this.routes.put('/appointment/:id', this.controller.editAppointment)
    this.routes.delete('/appointment/:id', this.controller.deleteAppointment)
  }
}
