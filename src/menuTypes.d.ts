// ---------------------------------------------------------------
// 1. THE MENU
// ---------------------------------------------------------------


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

// TS: These three objects share a structure - declare an interface (call it
//     MenuItem) that describes it, and annotate each declaration with it.
//     Note that 'nutrition' is a nested object, so it needs a nested type.
const soup: MenuItem = {
  id: 1,
  name: "Roast Tomato Soup",
  course: "starter",
  price: 5.5,
  nutrition: {
    calories: 180,
    allergens: ["celery"],
  },
};

const risotto: MenuItem = {
  id: 2,
  name: "Mushroom Risotto",
  // TS: 'course' should only ever be one of three values. Declare a *literal
  //     (union) type* called Course - "starter" | "main" | "dessert" - and use
  //     it as the property's type instead of string. One of the objects below
  //     will then fail to compile. Good.
  course: "main",
  price: 14.0,
  nutrition: {
    calories: 620,
    allergens: ["milk"],
  },
};

const brownie: MenuItem = {
  id: 3,
  name: "Chocolate Brownie",
  course: "desert",
  price: 6.0,
  nutrition: {
    calories: 450,
    allergens: ["milk", "eggs", "gluten"],
  },
};

// TS: Not every item is on offer, and only some are seasonal. Add two
//     *optional properties* to MenuItem - discountPercent (number) and
//     availableFrom (Date) - and set them on one or two items here. The
//     existing objects that lack them must still compile.
const menu = [soup, risotto, brownie];

// TS: A combo is a named bundle of menu items sold at a fixed price. Declare a
//     second interface for it (ComboDeal: id, name, items, price).
const lunchCombo = {
  id: 101,
  name: "Soup & Sweet",
  items: [soup, brownie],
  price: 10.0,
};

// TS: An order line is *either* a MenuItem or a ComboDeal. Declare a *type
//     alias* for that union (e.g. OrderLine) and use it for the array below.
const currentOrder = [risotto, lunchCombo, soup];