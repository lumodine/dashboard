"use server";

import {cookies} from "next/headers";

const get = async (key: string) => (await cookies()).get(key)?.value;

const set = async (key: string, value: string, options: any = {}) => {
  (await cookies()).set(key, value, {
    sameSite: "strict",
    ...options,
  });
};

const remove = async (key: string) => {
  (await cookies()).delete(key);
};

export {get, set, remove};
