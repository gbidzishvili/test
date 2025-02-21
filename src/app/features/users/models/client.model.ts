export interface Client {
  id: number;
  name: string;
  surname: string;
  gender: boolean;
  personalNumber: number;
  mobileNumber: number;
  legalAddress: {
    country: string;
    city: string;
    address: string;
  };
  physicalAddress: {
    country: string;
    city: string;
    address: string;
  };
  image: string | File;
}
