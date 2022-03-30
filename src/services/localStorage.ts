interface ITokenKeys {
  token: string;
}
export const STORAGE_KEYS: ITokenKeys = {
  token: 'token',
};

export function getStorageValue<Key = any>(key: string): any | null {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value || '');
  } catch (e) {
    console.error('Error parsing localStorage', e);
  }
  return null;
}

export function setStorageValue(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageValue(key: string) {
  localStorage.removeItem(key);
}
