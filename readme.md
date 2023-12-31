## itarr
iterator arrays (lists technically but ok)

Light weight (`1933B` minified) drop in replacement for arrays that allows you to chain methods together and lazily evaluate them. Is iterator based so no extra memory is used for the iterator methods.

I don't know of any clean way of dealing with async, so beware. If you add async anywhere in any step, it'll cascade through the rest of the steps. I'm not sure if this is a good thing or not, but it's what We've got for now.

```js
import List from 'itarr';

// test 1
const list = new List([1, 2, 3, [[4, 5], 6], 7])
  .flat(2)
  .map((item) => item * 2)
  .forEach((item) => console.log("LOG:", item))
  .filter((item) => item >= 6)
  .collect(); // this is required to get the array back

// will console.log EACH of: 2, 4, 6,..., 14
console.log(a); // [6, 8, 10, 12, 14]
```

```js
import List from 'itarr';

// async example, json todos
let list = new List([1, 2, 3])
  .map((item) => fetch(`https://jsonplaceholder.typicode.com/todos/${item}`))
  .map((item) => item.json())
  .map(async (item) => await item.title)
  // i hate looking at this, but it idk how to make it better
  .forEach(async (item) => console.log("LOG:", await item))
  .collect(); // this is required to get the array back

list = await Promise.all(list);
console.log(list); // the todos titles
```