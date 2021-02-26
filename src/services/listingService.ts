/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ListingEntry,
  AverageSellingPrice,
  AverageData,
  Distribution,
} from '../types';
import listingEntries from '../../data/listings';

const getListings = (): Array<ListingEntry> => {
  return listingEntries;
};

const averageSelling = (): AverageSellingPrice => {
  // Get total price for each sellerType and the amount
  const averageData: AverageData = listingEntries.reduce(
    (all, current) => {
      const { seller_type, price } = current;
      switch (seller_type) {
        case 'private':
          all.private.price += Number(price);
          all.private.count += 1;
          break;
        case 'dealer':
          all.dealer.price += Number(price);
          all.dealer.count += 1;
          break;
        case 'other':
          all.other.price += Number(price);
          all.other.count += 1;
          break;
        default:
          'error';
          break;
      }
      return all;
    },
    {
      private: { price: 0, count: 0 },
      dealer: { price: 0, count: 0 },
      other: { price: 0, count: 0 },
    }
  );
  // Compute the average prices for each type
  const privateAverage: number =
    averageData.private.price / averageData.private.count;
  const dealerAverage: number =
    averageData.dealer.price / averageData.dealer.count;
  const otherAverage: number =
    averageData.other.price / averageData.other.count;
  return {
    private: privateAverage,
    dealer: dealerAverage,
    other: otherAverage,
  };
};

const getDistribution = (): Array<Distribution> => {
  // Determine all the different car makes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object: any = {};
  for (let i = 0; i < listingEntries.length; i++) {
    const carMake: string = listingEntries[i].make;
    if (!object[carMake]) {
      object[carMake] = 1;
    } else {
      object[carMake] += 1;
    }
  }

  const distribution = [] as Array<Distribution>;

  for (const key in object) {
    const amount = object[key];
    const percentage: number = amount / listingEntries.length;
    distribution.push({ make: key, distribution: percentage });
  }

  return distribution;
};

export default { getListings, averageSelling, getDistribution };
