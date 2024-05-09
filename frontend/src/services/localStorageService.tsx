interface LocalStorageService {
    getAllItems(): { [key: string]: any };
    getAuth0User(): any;
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    getSub(): any[];
    clear(): void;
  }
  
  const localStorageService: LocalStorageService = {
    getAllItems() {
      const items: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) as string;
        items[key] = JSON.parse(localStorage.getItem(key) as string);
      }
      return items;
    },

    getSub() {
      const subs: any[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) as string;
        const item = JSON.parse(localStorage.getItem(key) as string);
        if (item && typeof item === 'object' && item.hasOwnProperty('sub')) {
          subs.push(item.sub);
        }
      }
      return subs;
    },

    getAuth0User() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    getItem(key: string) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
  
    setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    removeItem(key: string) {
      localStorage.removeItem(key);
    },
  
    clear() {
      localStorage.clear();
    }
  };
  
  export default localStorageService;
  