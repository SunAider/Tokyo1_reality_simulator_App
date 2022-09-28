import { NextFunction, Request, Response } from 'express';
import { CreatePropertyDto } from '@dtos/properties.dto';
import { PropertyInterface } from '@interfaces/properties.interface';
import PropertyService from '@services/properties.service';

class PropertiesController {
  public propertyService = new PropertyService();

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllData: PropertyInterface[] = await this.propertyService.findAll();

      res.status(200).json(findAllData);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findOneData: PropertyInterface = await this.propertyService.findOne(req.params.id);

      res.status(200).json(findOneData);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  };

  public remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  };
}

export default PropertiesController;
