export function filterCategory(categories) {
  let ca = [];
  let arr = [{ key: 0, text: "none", value: "none" }];
  categories.forEach((c, i) => {
    if (ca.indexOf(c.category) < 0) {
      ca.push(c.category);
      arr.push({
        key: c.category,
        text: c.category,
        value: c.category
      });
    }
  });
  return arr;
}
