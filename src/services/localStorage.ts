export enum STORAGE_KEYS {
  token = 'token',
}
export type IStorage = Record<STORAGE_KEYS, any>;

export function getStorageValue<Key = STORAGE_KEYS>(key: STORAGE_KEYS): any | null {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value || '');
  } catch (e) {
    console.error('Error parsing localStorage', e);
  }
  return null;
}

export function setStorageValue(key: STORAGE_KEYS, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageValue(key: string) {
  localStorage.removeItem(key);
}
