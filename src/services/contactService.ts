/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import contractEntries from '../../data/contacts';
import { ContactEntry, CarInfo, mostContactedCars } from './../types';
import listingEntries from '../../data/listings';

const getEntries = (): Array<ContactEntry> => {
  return contractEntries;
};

const averagePrice = (percentage: number): number => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object: any = {};
  const length: number = contractEntries.length;
  for (let i = 0; i < length; i++) {
    const id: string = contractEntries[i].listing_id;
    if (!object[id]) {
      object[id] = 1;
    } else {
      object[id] += 1;
    }
  }
  const entries: Array<[string, number]> = Object.entries(object);
  // sort by highest frequence
  const sorted: Array<[string, number]> = entries.sort((a, b) => b[1] - a[1]);
  const topPercentage: number = Math.round(length * percentage);
  const newSorted: Array<[string, number]> = sorted.slice(0, topPercentage);

  let totalPrice = 0;
  for (let j = 0; j < newSorted.length; j++) {
    const id = newSorted[j][0];
    const item = listingEntries.find((element) => element.id === id);
    if (item) {
      totalPrice += Number(item.price);
    }
  }

  return totalPrice / newSorted.length;
};

const mostContacted = (): Array<mostContactedCars> => {
  const obj: any = {};
  for (let i = 0; i < contractEntries.length; i++) {
    const contactDate = Number(contractEntries[i].contact_date);
    const month = new Date(contactDate).getMonth() + 1;
    const year = new Date(contactDate).getFullYear();
    const date = `${month}_${year}`;
    const id = Number(contractEntries[i].listing_id);
    if (!obj[date]) {
      obj[date] = [{ id: id, count: 1 }];
    } else {
      // Date already exist for the contact id.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const index = obj[date].findIndex(
        (item: { id: number }) => item.id === id
      );
      // No index was found
      if (index === -1) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        obj[date].push({ id: id, count: 1 });
      } else {
        obj[date][index].count += 1;
      }
    }
  }

  const mostContactedCars = [];
  for (let j = 0; j < Object.entries(obj).length; j++) {
    const date: string = Object.entries(obj)[j][0];
    const entries: any = Object.entries(obj)[j][1];
    const sortedEntries = entries
      .sort((a: { count: number }, b: { count: number }) =>
        a.count < b.count ? 1 : b.count < a.count ? -1 : 0
      )
      .slice(0, 5);

    const allCars: any = [];
    sortedEntries.forEach((item: { id: string; count: number }) => {
      const car = listingEntries.find(
        (list) => Number(list.id) === Number(item.id)
      ) as CarInfo;
      car.count = item.count;
      if (car) {
        allCars.push(car);
      }
    });

    mostContactedCars.push({ date: date, carInfo: allCars });
  }

  return mostContactedCars;
};

export default { getEntries, averagePrice, mostContacted };
