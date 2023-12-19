## itarr
iterator arrays (lists technically but ok)

Light weight (`1136B` minified) drop in replacement for arrays that allows you to chain methods together and lazily evaluate them. Is iterator based so no extra memory is used for the iterator methods.

```ts
import A from 'itarr';

const a = new A([1, 2, 3, 4, 5])
  .map((x) => x * 2)
  .forEach((x) => console.log(x))
  .filter((x) => x > 5)
  .collect();

// will console.log EACH of: 2, 4, 6, 8, 10 also
console.log(a); // [6, 8, 10]
```