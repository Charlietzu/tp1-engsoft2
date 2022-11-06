import type { Express, Router } from 'express'
import AppointmentComposer from './composers/appointment.composer'
import DoctorComposer from './composers/doctor.composer'
import ExamComposer from './composers/exam.composer'
import PatientComposer from './composers/patient.composer'
import ReceptionistComposer from './composers/receptionist.composer'
import UserComposer from './composers/user.composer'
import express from 'express'
export default class App {
  app: Express
  router: Router
  constructor(app: Express, router: Router) {
    this.app = app
    this.router = router
  }

  private setupRoutes() {
    new PatientComposer(this.router).compose()
    new DoctorComposer(this.router).compose()
    new ReceptionistComposer(this.router).compose()
    new ExamComposer(this.router).compose()
    new UserComposer(this.router).compose()
    new AppointmentComposer(this.router).compose()
  }

  public run() {
    this.setupRoutes()
    this.app.use(express.json())
    this.app.use(this.router)
    this.app.listen(3000, () =>
      console.log('🚀 Server ready at: http://localhost:3000')
    )
  }
}
