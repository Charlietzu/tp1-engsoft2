import type { Router } from 'express'
import DoctorController from '../controllers/doctor.controller'
import DoctorRoute from '../routes/doctor.route'

export default class DoctorComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new DoctorRoute(this.router, new DoctorController()).buildRoutes()
  }
}
