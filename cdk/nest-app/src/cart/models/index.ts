export enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS',
  ORDERED = 'ORDERED'
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product: Product,
  count: number,
}

export type Cart = {
  id: string,
  userId: string,
  created_at: string,
  updated_at: string,
  status: CartStatuses,
  items: CartItem[],
}
