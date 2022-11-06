import express, { Router } from 'express'
import App from './main/app'

const app = express()
const router = Router()

async function main() {
  const server = new App(app, router)
  server.run()
}

main().catch((e) => console.error(e))
