import { contextBridge, ipcRenderer } from "electron";

//TODO storeApi移行して削除
contextBridge.exposeInMainWorld("storeApi", {
  getStoreValue: async (name, key) => {
    return await ipcRenderer.invoke("getStoreValue", name, key);
  },
  setStoreValue: async (name, key, value) => {
    return await ipcRenderer.invoke("setStoreValue", name, key, value);
  },
  hasStoreValue: async (name, key) => {
    return await ipcRenderer.invoke("hasStoreValue", name, key);
  }, //上削除
  operateStore: async ({ method, arg }) => {
    return await ipcRenderer.invoke("operateStore", { method, arg });
  },
});

contextBridge.exposeInMainWorld("electronApi", {
  operateShowSave: async ({ method, arg }) => {
    return await ipcRenderer.invoke("operateShowSave", { method, arg });
  },
  operateShowOpen: async ({ method, arg }) => {
    return await ipcRenderer.invoke("operateShowOpen", { method, arg });
  },
});

contextBridge.exposeInMainWorld("fastApi", {
  operateFastApi: async ({ method, arg }) => {
    return await ipcRenderer
      .invoke("operateFastApi", { method, arg })
      .then()
      .catch((error) => {
        console.log(error);
        return { status: false, response: "ipc通信エラー" };
      });
  },
});
