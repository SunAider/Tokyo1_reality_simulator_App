import { Router } from 'express';
import MyPropertiesController from '@controllers/myproperties.controller';
import { Routes } from '@interfaces/routes.interface';
import preauthMiddleware from '@/middlewares/preauth.middleware';

class MyPropertiesRoute implements Routes {
  public path = '/api/v1/my-properties';
  public router = Router();
  public mypropertiesController = new MyPropertiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, preauthMiddleware, this.mypropertiesController.findAll);
    this.router.get(`${this.path}/:id`, preauthMiddleware, this.mypropertiesController.findOne);
    this.router.post(`${this.path}`, preauthMiddleware, this.mypropertiesController.create);
    this.router.put(`${this.path}/:id`, preauthMiddleware, this.mypropertiesController.update);
    this.router.delete(`${this.path}/:id`, preauthMiddleware, this.mypropertiesController.remove);
  }
}

export default MyPropertiesRoute;
