export interface MenuItem {
  id: number;
  name: string;
  course: "starter" | "main" | "dessert";
  price: number;
  nutrition: {
    calories: number;
    allergens: string[];
  };
  discountPercent?: number;
  availableFrom?: Date;
}

export interface ComboDeal {
  id: number;
  name: string;
  items: MenuItem[];
  price: number;
}

export type OrderLine = MenuItem | ComboDeal;