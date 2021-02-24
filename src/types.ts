type Seller = 'private' | 'other' | 'dealer';

export interface ListingEntry {
  id: string;
  make: string;
  price: string;
  mileage: string;
  seller_type: Seller;
}

export interface ContactEntry {
  listing_id: string;
  contact_date: string;
}

export interface AverageSellingPrice {
  private: number;
  dealer: number;
  other: number;
}

export interface AverageData {
  private: Data;
  dealer: Data;
  other: Data;
}

interface Data {
  price: number;
  count: number;
}

export interface Distribution {
  make: string;
  distribution: number;
}
