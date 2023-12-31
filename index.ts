// this will be a Generator based List
// so that Higher order functions can be used chained
function* generate (array: any[]) {
  let i = 0;
  while (i < array.length) {
    yield array[i++];
  }
}

type Generator = any;
declare global {
  interface IterableIterator<T> {
    [Symbol.iterator] (): IterableIterator<T>;
  }
}

class List {
  data: any[] | Generator = []
  constructor(array: any[] | Generator) {
    if (Array.isArray(array)) {
      this.data = generate(array);
    } else if (array.constructor.name === 'GeneratorFunction') {
      this.data = array()
    } else {
      throw new Error('List constructor expects an array or a generator');
    }
  }

  map (fn: any, ctx?: any): List {
    if (typeof fn !== 'function') {
      throw new TypeError('map expects a function');
    }

    const data = this.data;
    return new List(function* () {
      let index = 0;

      for (let x of data as any[]) {
        // @ts-ignore
        yield fn.call(ctx, x, index++, this);
      }
    });
  }

  filter (fn: any, ctx?: any): List {
    if (typeof fn !== 'function') {
      throw new TypeError('filter expects a function');
    }

    const data = this.data;
    return new List(function* () {
      let index = 0;

      for (let x of data as any[]) {
        // @ts-ignore
        if (fn.call(ctx, x, index++, this)) {
          yield x;
        }
      }
    });
  }

  forEach (fn: any, ctx?: any): List {
    if (typeof fn !== 'function') {
      throw new TypeError('forEach expects a function');
    }

    let index = 0;
    const data = this.data;

    return new List(function* () {
      for (let x of data as any[]) {
        // @ts-ignore
        fn.call(ctx, x, index++, this);
        yield x;
      }
    });
  }

  reduce (fn: any, initialValue: any): any {
    if (typeof fn !== 'function') {
      throw new TypeError('reduce expects a function');
    }

    let index = 0;
    let accumulator;
    let generated = (this.data as Generator).next()


    if (generated.done) {
      if (initialValue === undefined) {
        throw new TypeError('reduce of empty list with no initial value');
      } else {
        return initialValue;
      }
    }

    if (initialValue)
      accumulator = initialValue;
    else
      accumulator = generated.value;

    while (!generated.done) {
      accumulator = fn.call(
        // @ts-ignore
        undefined, accumulator, generated.value, index, this
      );
      generated = (this.data as Generator).next();
    }

    return accumulator;
  }

  flat (depth: number = 1): List {
    if (typeof depth !== 'number') {
      throw new TypeError('flat expects a number');
    }

    const data = this.data;
    return new List(function* () {
      let index = 0;

      for (let x of data as any[]) {
        if (Array.isArray(x) && depth > 0) {
          yield* new List(x).flat(depth - 1).data;
        } else {
          yield x;
        }
      }
    });
  }

  collect (): any[] {
    return this.reduce((acc: any[], item: any) => {
      acc.push(item);
      return acc;
    }, []);
  }
}

export default List;