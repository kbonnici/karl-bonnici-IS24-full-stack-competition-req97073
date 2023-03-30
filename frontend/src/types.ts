export type Product = {
  foo: string[];
  blah: string;
};

export type GridRowProduct = Product & {
  id: number;
};
