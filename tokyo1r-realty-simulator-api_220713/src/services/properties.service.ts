import { StatusCodes } from 'http-status-codes';
import { CreatePropertyDto } from '@dtos/properties.dto';
import { HttpException } from '@exceptions/HttpException';
import { PropertyInterface } from '@interfaces/properties.interface';
import { isEmpty } from '@utils/util';
import db from "@/firebase";
import { genericConverter } from "@utils/firestore.util";

class PropertyService {

  public async findAll(): Promise<PropertyInterface[]> {
    try {
      const querySnapshot = await db.collection(PropertyInterface.collectionName)
      .withConverter(genericConverter<PropertyInterface>())
      .get();

      const properties: PropertyInterface[] = [];
      querySnapshot.docs.forEach((doc) => {
        properties.push(doc.data());
      });
      return properties;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOne(id: string): Promise<PropertyInterface> {
    const docRef = await db.collection(PropertyInterface.collectionName)
      .doc(id)
      .withConverter(genericConverter<PropertyInterface>())
      .get();

    if (!docRef.exists) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Property not found');
    }

    return docRef.data();
  }

}

export default PropertyService;
