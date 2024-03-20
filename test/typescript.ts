/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {} from 'eslint-plugin-unicorn';

const props = '';
const prop = '';
const args = '';
const str = '';
// const acc = '';
// const dev = '';
// const prod = '';
// const err = '';
// const std = '';
const fn = '';
const ref = '';
// const { a: b } = { a: '' };

// const foo = (ref: string) => {
//   ref;
// };

// export const _foo = '';

// function foo(): void {
//   //
// }

const foo = [1, 2];
const bar = [
  1,
  2,
];

['a'].map((v) => v);
['a']
  .map((v) => { return v; })
  .map((v) => v)
  .map((v) => v);

for (let i = 0; i < 1; ++i) {
  i;
}

const baz = (value: string, a: string): string => {
  return '';
};

const abc = (
  value: string,
): string => {
  return '';
};

/** */
export type Foo = true
  | false;

/** */
export enum Values {
  //
}

const single = 'a';
const double = "a's";
const template = `a`;

const b = {} as Bar;
b;
b();

/** */
export interface Bar {
  /** */
  (): void;
  /** */
  foo(): string;
  /** */
  bar: string;
  /** */
  get baz(): string;
  /** */
  set baz(value: string);
}

/** */
export class Baz {
  #a = '';
  #b(): void {
    //
  }

  /** */
  constructor() {
    //
  }

  /** */
  a(): void {
    //
  }

  private b(): void {
    //
  }

  /** */
  c = '';

  private d = '';

  /** */
  get e(): string {
    return '';
  }

  /** */
  set e(value: string) {
    //
  }

  private get f(): string {
    return '';
  }

  private set f(value: string) {
    //
  }
}

// export default Baz;
// export default '';

/** */
export function sdf(): void {
  //
}

// /** */
// export default (): void => {
//   //
// };

/** */
export const efg = (): void => {
  //
};

/** */
export type Abc = '';

// /** */
// export default '';

// /** */
// export default b();

// /** */
// export default new Baz();

export { foo };
export {};
