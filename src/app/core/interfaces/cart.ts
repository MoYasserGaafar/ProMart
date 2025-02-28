//These interfaces define the structure and properties of <Subcategory>, <Category>, <Brand>, <Products>, <Product>, <Data> and <Cart>.
//These interfaces are used to represent and manage data related to these entities in the application.

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Products {
    sold:  number;
    images: string[];
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface Product {
    count: number;
    _id: string;
    product: Products;
    price: number;
}

export interface Data {
    _id: string;
    CartOwner: string;
    products: Product[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface Cart {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: Data;
}