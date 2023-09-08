let db;

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const dbPromise = indexedDB.open('taskManagerDB', 1);

    dbPromise.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
      const userStore=db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      userStore.createIndex('username', 'username', { unique: true });
      resolve(db);
    };

    dbPromise.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    dbPromise.onerror = (event) => {
      console.error('Error opening IndexedDB:', event.target.error);
      reject(event.target.error);
    };
  });
}

export function getDatabase() {
  return db;
}
