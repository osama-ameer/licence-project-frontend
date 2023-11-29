export const getItemFromLocalStorage = (name) => {
  const item = localStorage.getItem(name);
  if (item) {
    return JSON.parse(item);
  }

  return null;
};

export const storeInLocalStorage = (name, val) => {
  localStorage.setItem(name, JSON.stringify(val));
};

export const userStoreInLocalStorage = (name, val) => {
  localStorage.setItem(name, val);
};

export const removeItemFromLocalStorage = (name) => {
  localStorage.removeItem(name);
  return true;
};

export const clearLocalStorage = () => {
  localStorage.clear();
  return true;
};
