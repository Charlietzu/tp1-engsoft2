import type { Router } from 'express'
import AppointmentController from '../controllers/appointment.controller'
import AppointmentRoute from '../routes/appointment.route'

export default class AppointmentComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new AppointmentRoute(this.router, new AppointmentController()).buildRoutes()
  }
}
