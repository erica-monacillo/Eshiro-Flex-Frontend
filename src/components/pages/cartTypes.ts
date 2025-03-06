export interface CartItem {
  id: number;
  name?: string;
  productName: string;
  price: number;
  imageSrc: string;
  size?: string;
  quantity: number;
}
