import { httpRequest } from "./httpRequest";
import Product from "types/Product";

const getAllProducts = () => {
    return httpRequest.get<Array<Product>>('');
}

const createProduct = (data: Product) => {
    return httpRequest.post<Product>('', data);
}

const updateProduct = (data: Product) => {
    return httpRequest.put<Product>('', data);
}

const deleteProduct = (id: string) => {
    return httpRequest.delete<Product>(`?id=${id}`);
}

const validateProductId = (id: string) => {
    return httpRequest.get<boolean>(`/verification?id=${id}`);
}


export const ProductService = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    validateProductId,
}
