export interface Account {
  id: string;
  userid: string;
  type: 'current' | 'savings' | 'deposit';
  currency: 'GEL' | 'USD' | 'EUR';
  status: 'active' | 'closed';
}
