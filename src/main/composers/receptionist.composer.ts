import type { Router } from 'express'
import ReceptionistController from '../controllers/receptionist.controller'
import ReceptionistRoute from '../routes/receptionist.route'

export default class ReceptionistComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new ReceptionistRoute(
      this.router,
      new ReceptionistController()
    ).buildRoutes()
  }
}
