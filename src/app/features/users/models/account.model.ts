export interface Account {
  id: number;
  clientNumber: number;
  type: 'current' | 'savings' | 'deposit';
  currency: 'GEL' | 'USD' | 'EUR';
  status: 'active' | 'closed';
}
