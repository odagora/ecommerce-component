export function setItemToLocalStorage(key, values) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.error('Error storing items in localStorage:', error);
  }
}

export function getItemFromLocalStorage(key) {
  try {
    const localStorageItems = localStorage.getItem(key)
    if(localStorageItems) {
      return JSON.parse(localStorageItems);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error retrieving items from localStorage', error);
  }
}

export function removeItemFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing items from localStorage', error);
  }
}