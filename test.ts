import List from ".";

// test
const list = new List([1, 2, 3, 4, 5])
  .map((item) => item * 2)
  .forEach((item) => console.log(item))
  .filter((item) => item > 4)
  .collect();

let match = true;
const expect = [6, 8, 10];
for (let i = 0; i < expect.length; i++) {
  if (expect[i] !== list[i]) {
    match = false;
    break;
  }
}

console.log("TESTS: ", match ? "PASS" : "FAIL");