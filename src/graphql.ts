
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;
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
    uid: string;
    updatedAt: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
