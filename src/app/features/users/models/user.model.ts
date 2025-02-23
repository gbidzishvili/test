export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
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
