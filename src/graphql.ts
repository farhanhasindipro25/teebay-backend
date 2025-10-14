
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

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
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
