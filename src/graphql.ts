
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Category {
    ELECTRONICS = "ELECTRONICS",
    FURNITURE = "FURNITURE",
    HOME_APPLIANCES = "HOME_APPLIANCES",
    OUTDOOR = "OUTDOOR",
    SPORTING_GOODS = "SPORTING_GOODS",
    TOYS = "TOYS"
}

export interface CreateProductInput {
    categories: Category[];
    description?: Nullable<string>;
    price: number;
    rentEndsAt?: Nullable<string>;
    rentStartsAt?: Nullable<string>;
    rentalPrice?: Nullable<number>;
    rentalType?: Nullable<string>;
    title: string;
    userUid: string;
}

export interface CreateUserInput {
    address?: Nullable<string>;
    email: string;
    name: string;
    password: string;
    phone?: Nullable<string>;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface UpdateProductInput {
    categories?: Nullable<Category[]>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    productUid: string;
    rentEndsAt?: Nullable<string>;
    rentStartsAt?: Nullable<string>;
    rentalPrice?: Nullable<number>;
    rentalType?: Nullable<string>;
    title?: Nullable<string>;
    userUid: string;
}

export interface AuthUser {
    address?: Nullable<string>;
    email: string;
    name: string;
    phone?: Nullable<string>;
    uid: string;
}

export interface DeleteProductResponse {
    message: string;
    success: boolean;
}

export interface LoginResponse {
    message: string;
    success: boolean;
    user?: Nullable<AuthUser>;
}

export interface IMutation {
    createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    deleteProduct(productUid: string, userUid: string): DeleteProductResponse | Promise<DeleteProductResponse>;
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
    updateProduct(updateProductInput: UpdateProductInput): Product | Promise<Product>;
}

export interface Product {
    categories: Category[];
    createdAt: DateTime;
    createdById: number;
    createdByInfo?: Nullable<User>;
    description?: Nullable<string>;
    id: number;
    isActive: boolean;
    isBought: boolean;
    isRented: boolean;
    price: number;
    rentEndsAt?: Nullable<string>;
    rentStartsAt?: Nullable<string>;
    rentalPrice?: Nullable<number>;
    rentalType?: Nullable<string>;
    title: string;
    uid: string;
    updatedAt: DateTime;
}

export interface IQuery {
    product(uid: string): Product | Promise<Product>;
    products(): Product[] | Promise<Product[]>;
    productsByUser(userUid: string): Product[] | Promise<Product[]>;
    user(uid: string): User | Promise<User>;
    users(): User[] | Promise<User[]>;
}

export interface User {
    address?: Nullable<string>;
    createdAt: DateTime;
    email: string;
    id: number;
    isActive: boolean;
    name: string;
    password: string;
    phone?: Nullable<string>;
    products?: Nullable<Product[]>;
    uid: string;
    updatedAt: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
