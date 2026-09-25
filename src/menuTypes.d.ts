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

