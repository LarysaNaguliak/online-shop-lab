export interface IProducts {
  id: number,
  title: string,
  price: number,
  size: string,
  image?: string,
  configure: IProductsConfig;
  quantity: number;
}

export interface IProductsConfig {
  frame: string,
  glass: string,
}
