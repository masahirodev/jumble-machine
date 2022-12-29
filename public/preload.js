"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
//TODO storeApi移行して削除
electron_1.contextBridge.exposeInMainWorld("storeApi", {
    getStoreValue: async (name, key) => {
        return await electron_1.ipcRenderer.invoke("getStoreValue", name, key);
    },
    setStoreValue: async (name, key, value) => {
        return await electron_1.ipcRenderer.invoke("setStoreValue", name, key, value);
    },
    hasStoreValue: async (name, key) => {
        return await electron_1.ipcRenderer.invoke("hasStoreValue", name, key);
    },
    operateStore: async ({ method, arg }) => {
        return await electron_1.ipcRenderer.invoke("operateStore", { method, arg });
    },
});
electron_1.contextBridge.exposeInMainWorld("electronApi", {
    operateShowSave: async ({ method, arg }) => {
        return await electron_1.ipcRenderer.invoke("operateShowSave", { method, arg });
    },
    operateShowOpen: async ({ method, arg }) => {
        return await electron_1.ipcRenderer.invoke("operateShowOpen", { method, arg });
    },
});
electron_1.contextBridge.exposeInMainWorld("fastApi", {
    operateFastApi: async ({ method, arg }) => {
        return await electron_1.ipcRenderer
            .invoke("operateFastApi", { method, arg })
            .then()
            .catch((error) => {
            console.log(error);
            return { status: false, response: "ipc通信エラー" };
        });
    },
    helloWorld: async (word) => {
        return await electron_1.ipcRenderer.invoke("helloWorld", word);
    },
});
//# sourceMappingURL=preload.js.map