export const getLocalStorageKey = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorageKey = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const removeLocalStorageKey = (key: string) => {
  localStorage.removeItem(key);
};
