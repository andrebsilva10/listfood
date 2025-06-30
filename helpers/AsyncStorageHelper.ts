import AsyncStorage from '@react-native-async-storage/async-storage';

const setString = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

const getString = async (key: string, defaultValue?: string) => {
  const val = await AsyncStorage.getItem(key);
  return val || defaultValue || null;
};

const setNumber = async (key: string, value: number) => {
  await AsyncStorage.setItem(key, value.toString());
};

const getNumber = async (key: string, defaultValue?: number) => {
  const val = await AsyncStorage.getItem(key);
  if (val) {
    return parseFloat(val);
  }
  return defaultValue || null;
};

const setBoolean = async (key: string, value: boolean) => {
  await AsyncStorage.setItem(key, value.toString());
};

const getBoolean = async (key: string, defaultValue?: boolean) => {
  const val = await AsyncStorage.getItem(key);
  if (val == 'true' || val == 'false') return val;
  if (typeof defaultValue == 'boolean') return defaultValue;
  return null;
};

const setObject = async <T>(key: string, value: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getObject = async <T>(
  key: string,
  defaultValue?: T
): Promise<T | null> => {
  const val = await AsyncStorage.getItem(key);

  if (val != null) {
    return JSON.parse(val);
  }

  if (defaultValue) {
    return defaultValue;
  }

  return null;
};

const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

const AsyncStorageHelper = {
  setString,
  getString,
  setNumber,
  getNumber,
  getBoolean,
  setBoolean,
  setObject,
  getObject,
  removeItem,
};

export default AsyncStorageHelper;
