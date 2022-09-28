import { NextFunction, Request, Response } from 'express';
import formidable, { File } from 'formidable';
import { CreateMyPropertyDto } from '@dtos/myproperties.dto';
import { PropertyAddressDto } from '@/dtos/property-address.dto';
import { PropertyOwnerDto } from '@/dtos/property-owner.dto';
import { PropertyInterface } from '@interfaces/properties.interface';
import MyPropertyService from '@services/myproperties.service';
import PropertyService from '@services/properties.service';
import { Storage } from '@google-cloud/storage';
import { BUCKET_NAME } from '@config';

class MyPropertiesController {
  public mypropertyService = new MyPropertyService();
  public propertyService = new PropertyService();
  private storage = new Storage();
  private bucket = this.storage.bucket(BUCKET_NAME);

  public findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllData: PropertyInterface[] = await this.mypropertyService.findAll(req.body['uid']);

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

    // this.bucket.file('properties/ddd_2022-07-13T04:35:22.628Z.jpg').delete();
    // res.status(200).json({result: true});

    let form = new formidable.IncomingForm();
    form.parse(req, async (err: Error, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        next(err);
      }

      let filePath = '';
      if (fields && fields.cover) {
        try {
          filePath = `properties/${fields.title}_${new Date().toISOString()}.jpg`;
          let options = {
            destination: filePath
          };
          const file = this.bucket.file(filePath);
          const base64Image = Buffer.from(
            (fields.cover as string).replace(/^data:image\/(png|gif|jpeg);base64,/, ''),
            'base64',
          );
          await file.save(base64Image);
          await file.makePublic();

          const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${filePath}`;
          console.log('xxx - ', publicUrl);
        } catch (error) {
          next(error);
        }
      }

      const propertyData: CreateMyPropertyDto = <CreateMyPropertyDto><unknown>fields;
      propertyData.uid = req.body['uid'];
      propertyData.cover = filePath;
      propertyData.address = <PropertyAddressDto>JSON.parse(fields.address as string);
      propertyData.owner = <PropertyOwnerDto>JSON.parse(fields.owner as string);
      const createPropertyData: PropertyInterface = await this.mypropertyService.create(propertyData);
      res.status(201).json(createPropertyData);
    });
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  };

  public remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.mypropertyService.remove(req.params.id);

      res.status(200).json({result: true});
    } catch (error) {
      next(error);
    }
  };
}

export default MyPropertiesController;
