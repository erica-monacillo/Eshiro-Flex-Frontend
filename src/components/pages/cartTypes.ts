export interface CartItem {
  id: number;
  name?: string;
  productName: string;
  price: string;
  image_Url: string;
  size?: string;
  quantity: number;
  isSelected?: boolean; // Add this
}
