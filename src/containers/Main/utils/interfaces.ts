export interface ProductsInf {
  color: string;
  id: number;
  name: string;
  pantone_value: string;
  year: number;
}
export interface fetchInf {
  page: number;
  per_page: number;
}

export interface userResponse {
  data: ProductsInf[];
}

export interface BasicTableInf {
  products: ProductsInf[];
  handleShowModal: () => void;
  filterProductsToModal: (item: number) => void;
}

export interface ModalProductInf {
  handleShowModal: () => void;
  modalProduct: ProductsInf;
}
