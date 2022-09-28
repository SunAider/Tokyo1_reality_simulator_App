import { Router } from 'express';
import PropertiesController from '@controllers/properties.controller';
import { Routes } from '@interfaces/routes.interface';

class PropertiesRoute implements Routes {
  public path = '/api/v1/properties';
  public router = Router();
  public propertiesController = new PropertiesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.propertiesController.findAll);
    this.router.get(`${this.path}/:id`, this.propertiesController.findOne);
    this.router.post(`${this.path}`, this.propertiesController.create);
    this.router.put(`${this.path}/:id`, this.propertiesController.update);
    this.router.delete(`${this.path}/:id`, this.propertiesController.remove);
  }
}

export default PropertiesRoute;
