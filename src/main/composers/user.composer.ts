import type { Router } from 'express'
import UserController from '../controllers/user.controller'
import UserRoute from '../routes/user.route'

export default class UserComposer {
  private router: Router
  constructor(router: Router) {
    this.router = router
  }

  public compose() {
    new UserRoute(this.router, new UserController()).buildRoutes()
  }
}
