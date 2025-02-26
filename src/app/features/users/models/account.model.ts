export interface Account {
  id: string;
  clId: string;
  type: 'current' | 'savings' | 'deposit';
  currency: 'GEL' | 'USD' | 'EUR';
  status: 'active' | 'closed';
}
