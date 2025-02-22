export interface Account {
  id: number;
  userNumber: number;
  type: 'current' | 'savings' | 'deposit';
  currency: 'GEL' | 'USD' | 'EUR';
  status: 'active' | 'closed';
}
