import type { Router } from 'express'
import ReceptionistController from '../controllers/receptionist.controller'

export default class ReceptionistRoute {
  private routes: Router
  private controller: ReceptionistController

  constructor(routes: Router, controller: ReceptionistController) {
    this.routes = routes
    this.controller = controller
  }
  public buildRoutes() {
    this.routes.get('/receptionists', this.controller.getReceptionists)
    this.routes.get('/receptionist/:id', this.controller.getReceptionistById)
    this.routes.post('/receptionist', this.controller.createReceptionist)
    this.routes.put('/receptionist/:id', this.controller.editReceptionist)
    this.routes.delete('/receptionist/:id', this.controller.deleteReceptionist)
  }
}
