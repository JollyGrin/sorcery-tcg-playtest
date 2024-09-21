import { ReactNode } from "react";

export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export type Children = { children: ReactNode };
