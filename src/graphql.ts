
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
    rentalPrice?: Nullable<number>;
    rentalTimeline?: Nullable<string>;
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

export interface AuthUser {
    address?: Nullable<string>;
    email: string;
    name: string;
    phone?: Nullable<string>;
    uid: string;
}

export interface LoginResponse {
    message: string;
    success: boolean;
    user?: Nullable<AuthUser>;
}

export interface IMutation {
    createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
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
    rentalPrice?: Nullable<number>;
    rentalTimeline?: Nullable<string>;
    rentalType?: Nullable<string>;
    title: string;
    uid: string;
    updatedAt: DateTime;
}

export interface IQuery {
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
