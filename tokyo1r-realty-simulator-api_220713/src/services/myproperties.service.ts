import { StatusCodes } from 'http-status-codes';
import { Timestamp } from '@google-cloud/firestore';
import { CreateMyPropertyDto } from '@dtos/myproperties.dto';
import { HttpException } from '@exceptions/HttpException';
import { PropertyInterface } from '@interfaces/properties.interface';
import { isEmpty } from '@utils/util';
import db from "@/firebase";
import { genericConverter } from "@utils/firestore.util";
import { calculateMonthlyRepayment } from '@utils/loan.util';
import { round } from '@utils/calc.util';

class MyPropertyService {

  public async findAll(uid: string): Promise<PropertyInterface[]> {
    try {
      const querySnapshot = await db.collection(PropertyInterface.collectionName)
      .where("owner.id", "==", uid)
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

  public async create({
    uid,
    builtAt,
    title,
    annualInterestRate,
    borrowingPeriodInYears,
    borrowingAmount,
    owner,
    ...rest
  }: CreateMyPropertyDto): Promise<PropertyInterface> {
    const docRef = await db.collection(PropertyInterface.collectionName)
      .doc()
      .withConverter(genericConverter<PropertyInterface>());

    await docRef.set({
      ...rest,
      title,
      builtAt: Timestamp.fromDate(new Date(builtAt)),
      annualInterestRate,
      borrowingPeriodInYears,
      borrowingAmount,
      monthlyLoanPaymentAmount: round(
        calculateMonthlyRepayment(
          annualInterestRate,
          borrowingPeriodInYears,
          borrowingAmount,
          0,
        ),
        0,
      ),
      owner: {
        ...owner,
        id: uid
      }
    });
    const propertyDoc = await docRef.get();
    return propertyDoc.data();
  }

  public async remove(id: string) {
    const docRef = await db.collection(PropertyInterface.collectionName)
      .doc(id)
      .withConverter(genericConverter<PropertyInterface>());

    if (!(await docRef.get()).exists) {
      throw new HttpException(StatusCodes.NOT_FOUND, 'Property not found');
    }

    await docRef.delete();
  }

}

export default MyPropertyService;
