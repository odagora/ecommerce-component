export function setItemsToLocalStorage(key, values) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.error('Error storing items in localStorage:', error);
  }
}

export function getItemsFromLocalStorage(key) {
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