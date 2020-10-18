import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import  uploadConfig  from './config/upload'
import multer from 'multer'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

export default routes