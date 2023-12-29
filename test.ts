import List from ".";

const match = (result) => result ? "🟢" : "🔴";

function isSame (array1, array2) {
  let match = true;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      match = false;
      break;
    }
  }

  return match;
}

// // test 1
const list = new List([1, 2, 3, [[4, 5], 6], 7])
  .flat(2)
  .map((item) => item * 2)
  .forEach((item) => console.log("LOG:", item))
  .filter((item) => item >= 6)
  .collect();

let result = isSame(list, [6, 8, 10, 12, 14]);
console.log("TESTS: ", match(result));