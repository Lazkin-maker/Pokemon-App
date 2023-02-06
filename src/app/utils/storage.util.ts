export class StorageUtil {
    /**
     * Save key/value pair in sessionStorage
     * @param key Name of key to match your value
     * @param value The value you want to write to sessionStorage
     */
    public static storageSave<T>(key: string, value: T){
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    /**
     * Read value from sessionStorage
     * @param key Name of key to match your value
     */
    public static storageRead<T>(key: string) : T | undefined {
        const storedValue = sessionStorage.getItem(key);
      try {
        if (storedValue) {
            return JSON.parse(storedValue) as T;
        } else {
            return undefined; 
        }
      }
      catch (e) {
        sessionStorage.removeItem(key);
        return undefined;
      }
    }
}