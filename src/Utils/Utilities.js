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

export function getUnique(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
  return unique;
}
export function shortenText(text, len) {
  if (text.length > len) {
    return text.substring(0, len - 3) + "...";
  } else return text;
}
