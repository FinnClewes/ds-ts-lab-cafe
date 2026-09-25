// ---------------------------------------------------------------
// 2. FUNCTIONS
// ---------------------------------------------------------------

// TS: Give every function below an explicit parameter type. Add an explicit
//     return type only where it documents something non-obvious - elsewhere
//     rely on *type inference* (check the inferred signature with VS Code's
//     intellisense before you decide).

function describe(item) {
  return `${item.name} (${item.course}) - EUR ${item.price.toFixed(2)}`;
}

// TS: An OrderLine is a union, so this function must *narrow* the type before
//     it can touch the properties that only one member has. Use the 'in'
//     operator - a ComboDeal has an 'items' property, a MenuItem does not.
function lineTotal(line) {
  if ("items" in line) {
    return line.price; // Combos are sold at their bundle price.
  }
  return line.price;
}

function orderTotal(lines) {
  return lines.reduce((total, line) => total + lineTotal(line), 0);
}

// TS: 'predicate' is a callback - a *higher order function* parameter. Type it
//     as a function signature: (item: MenuItem) => boolean.
function filterMenu(items, predicate) {
  return items.filter(predicate);
}

// TS: 'max' should be an *optional parameter*: when omitted, return every
//     match. Beware - the compiler will complain about comparing a possibly
//     'undefined' value with a number, so handle that case explicitly.
function cheapest(items, max) {
  const sorted = items.sort((a, b) => a.price - b.price);
  return sorted.slice(0, max);
}

// TS: This function works on any array, not just menu items. Make it
//     *generic*: <T>(data: T[], criteria: (d: T) => boolean) => T | undefined.
function firstMatch(data, criteria) {
  return data.find(criteria);
}

// TS: 'changes' holds *some* of a MenuItem's properties. Use the Partial<>
//     *utility type* rather than declaring a new interface by hand.
function updateItem(item, changes) {
  return { ...item, ...changes };
}

// TS: The kitchen ticket needs the name and course of an item, and nothing
//     else - and it must not be modifiable once created. Declare its type by
//     composing two utility types: Readonly<Pick<...>>.
function kitchenTicket(item) {
  return {
    name: item.name,
    course: item.course,
  };
}

// TS: An allergy card is a MenuItem without its nutrition property, but with a
//     'warning' string added. Declare its type with Omit<> and an intersection
//     (&) - see the EventPass example in the Utility Types section.
function allergyCard(item) {
  return {
    id: item.id,
    name: item.name,
    course: item.course,
    price: item.price,
    warning: `Contains: ${item.nutrition.allergens.join(", ")}`,
  };
}

// ---------------------------------------------------------------
// 3. TESTS - these should still produce the same output afterwards.
// ---------------------------------------------------------------

console.log(describe(risotto));
console.log(orderTotal(currentOrder));
console.log(filterMenu(menu, (i) => i.nutrition.calories < 500));
console.log(cheapest(menu, 2));
console.log(cheapest(menu));
console.log(firstMatch(menu, (i) => i.course === "dessert"));
console.log(updateItem(soup, { price: 6.0, discountPercent: 10 }));
console.log(kitchenTicket(brownie));
console.log(allergyCard(brownie));

// TS: The compiler will reject the next line once kitchenTicket returns a
//     Readonly<> type. Leave it commented out with a note explaining why.
// kitchenTicket(brownie).name = "Something else";

// TS: Three more lines below are bugs that only the compiler can see. Once
//     your types are in place, fix each one and note it in your commit message.
console.log(describe(lunchCombo));
console.log(updateItem(soup, { price: "7.00" }));
console.log(firstMatch(menu, (i) => i.calories < 300));