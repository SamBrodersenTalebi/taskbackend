/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import contractEntries from '../../data/contacts';
import { ContactEntry } from './../types';
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

/*const mostContacted = ()=>{

}
*/

export default { getEntries, averagePrice };
