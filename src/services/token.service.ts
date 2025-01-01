import {get, set, remove} from "@/lib/cookie";

const COOKIE_KEY = "token";

const getToken = async () => await get(COOKIE_KEY);

const setToken = async (token: string) => {
  const cookieExpire = new Date();

  cookieExpire.setHours(cookieExpire.getHours() + 3);

  await set(COOKIE_KEY, token, {
    expires: cookieExpire,
  });
};

const removeToken = async () => await remove(COOKIE_KEY);

export default {
  COOKIE_KEY,
  getToken,
  setToken,
  removeToken,
};
