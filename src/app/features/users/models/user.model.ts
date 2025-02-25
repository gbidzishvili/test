export interface User {
  id: string;
  firstname: string;
  lastname: string;
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
  image: string;
}
