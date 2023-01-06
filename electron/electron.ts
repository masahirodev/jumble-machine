import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  OpenDialogSyncOptions,
} from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import { spawn, execFile, ChildProcess } from "child_process";
import axios from "axios";
import * as fs from "fs";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import * as ElectronStore from "electron-store";

let mainWindow: BrowserWindow;
let pythonProcess: ChildProcess;

//auto updata
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");

//Pythonサーバー設定
const PY_HOST = "127.0.0.1";
const PY_PORT = "8000";
const PY_LOG_LEVEL = "info";

//シークレットトークン
const generateHexString = (length: number) => {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
};
const SECRET_TOKEN_LENGTH = 64;
const SECRET_TOKEN = generateHexString(SECRET_TOKEN_LENGTH);

const launchPython = () => {
  if (isDev) {
    pythonProcess = spawn("python3", [
      "./py_src/main.py",
      "--host",
      PY_HOST,
      "--port",
      PY_PORT,
      "--log-level",
      PY_LOG_LEVEL,
      "--secret",
      SECRET_TOKEN,
    ]);
    console.log("Python process started in dev mode");
  } else {
    pythonProcess = execFile(
      path.join(
        __dirname,
        "../../../py_dist/main/",
        process.platform === "darwin" ? "main" : "main.exe"
      ),
      [
        "--host",
        PY_HOST,
        "--port",
        PY_PORT,
        "--log-level",
        PY_LOG_LEVEL,
        "--secret",
        SECRET_TOKEN,
      ]
    );
    console.log("Python process started in built mode");
  }
  return pythonProcess;
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      //開発環境だけfalse
      webSecurity: !isDev,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    //devtool機能、detach:devtool分離
    mainWindow.webContents.openDevTools({ mode: "detach" });

    //hot reload
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  } else {
    //メニューバー非表示
    mainWindow.setMenu(null);
  }

  return mainWindow;
};

app.whenReady().then(() => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((error) => console.log(`An error occurred: , ${error}`));
  }
  pythonProcess = launchPython();
  mainWindow = createWindow();

  autoUpdater.checkForUpdatesAndNotify();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    pythonProcess.kill();
    app.quit();
  }
});

//auto update
autoUpdater.on("checking-for-update", () => {
  log.info(process.pid, "checking-for-update...");
});

// アップデートが見つかった
autoUpdater.on("update-available", (event, info) => {
  log.info(process.pid, "Update available.");
});
// アップデートがなかった（最新版だった）
autoUpdater.on("update-not-available", (event, info) => {
  log.info(process.pid, "Update not available.");
});
// アップデートのダウンロードが完了
autoUpdater.on("update-downloaded", (info) => {
  const dialogOpts = {
    type: "info",
    buttons: ["更新して再起動", "あとで"],
    message: "アップデート",
    detail:
      "新しいバージョンをダウンロードしました。再起動して更新を適用しますか？",
  };

  // ダイアログを表示しすぐに再起動するか確認
  dialog.showMessageBox(mainWindow, dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
// エラーが発生
autoUpdater.on("error", (error: unknown) => {
  log.error(process.pid, error);
});

//storeAPI
//データを取得
ipcMain.handle("getStoreValue", (event, name, key) => {
  const store = new ElectronStore({
    cwd: app.getPath("userData"),
    name: name,
    fileExtension: "json",
  });
  try {
    return store.get(key);
  } catch (err) {
    return err;
  }
});

//データを保存
ipcMain.handle("setStoreValue", (event, name, key, value) => {
  const store = new ElectronStore({
    cwd: app.getPath("userData"),
    name: name,
    fileExtension: "json",
  });
  return store.set(key, value);
});

//データがあるか確認
ipcMain.handle("hasStoreValue", (event, name, key) => {
  const store = new ElectronStore({
    cwd: app.getPath("userData"),
    name: name,
    fileExtension: "json",
  });
  return store.has(key);
});

ipcMain.handle("operateStore", (event, { method, arg }) => {
  const store = new ElectronStore({
    cwd: app.getPath("userData"),
    name: arg.name,
    fileExtension: "json",
  });
  try {
    switch (method) {
      case "get":
        const target = store.get(arg.key);
        if (target !== undefined) {
          return { status: true, response: store.get(arg.key) };
        } else {
          return { status: false, response: "no data" };
        }
      case "set":
        store.set(arg.key, arg.value);
        return { status: true, response: "ok" };
      case "has":
        return { status: store.has(arg.key), response: store.has(arg.key) };

      default:
        return { status: false, response: "no method" };
    }
  } catch (error: unknown) {
    console.error(error);
    return { status: false, response: error };
  }
});

ipcMain.handle("operateShowSave", async (event, { method, arg }) => {
  const path = dialog.showSaveDialogSync(mainWindow, {
    buttonLabel: "保存",
    filters: [{ name: arg.fileName, extensions: [arg.extension] }],
    properties: [
      "createDirectory", // ディレクトリの作成を許可 (macOS)
    ],
  });

  if (path === undefined) {
    return { status: false, response: "キャンセルされました。" };
  }

  try {
    switch (method) {
      case "fileSave":
        fs.writeFileSync(path, JSON.stringify(arg.data));
        return { status: true, response: path };

      default:
        return { status: false, response: "no method" };
    }
  } catch (error: unknown) {
    console.error(error);
    return { status: false, response: error };
  }
});

ipcMain.handle("operateShowOpen", async (event, { method, arg }) => {
  const dialogContents: OpenDialogSyncOptions = {
    buttonLabel: "開く",
    properties:
      method === "getFolder" || method === "getFolderContents"
        ? ["openDirectory"]
        : ["openFile"],
  };
  if (arg.fileName !== undefined) {
    dialogContents["filters"] = [
      {
        name: arg.fileName,
        extensions:
          typeof arg.extension === "string" ? [arg.extension] : arg.extension,
      },
    ];
  }

  const paths = dialog.showOpenDialogSync(mainWindow, dialogContents);

  if (paths === undefined) {
    return { status: false, response: "キャンセルされました。" };
  }

  const path = paths[0];

  try {
    switch (method) {
      case "fileOpen":
        const jsonObject = JSON.parse(fs.readFileSync(path, "utf8"));
        return {
          status: true,
          response: {
            path: path,
            text: jsonObject,
          },
        };

      case "getFolder":
        return {
          status: true,
          response: path,
        };

      case "getFile":
        return {
          status: true,
          response: path,
        };

      case "getFolderContents":
        const pathList: { [key: string]: string[] } = {};
        const folderList = fs
          .readdirSync(path, { withFileTypes: true })
          .filter((dirent) => dirent.isFile() === false)
          .map(({ name }) => name);

        folderList.forEach((value) => {
          const fileList = fs
            .readdirSync(path + "/" + value, { withFileTypes: true })
            .filter((dirent) => dirent.isFile())
            .map(({ name }) => name);

          const result = fileList.filter(
            (value) => value.split(".").pop() === "png"
          );
          pathList[value] = result;
        });

        return {
          status: true,
          response: { path: path, pathList: pathList },
        };

      default:
        return { status: false, response: "no method" };
    }
  } catch (error: unknown) {
    console.error(error);
    return { status: false, response: error };
  }
});

ipcMain.handle("operateFastApi", async (event, { method, arg }) => {
  const requestBody =
    method === "makeSample"
      ? {
          projectPath: app.getPath("userData") + `/${arg.projectId}.json`,
          exportPath: app.getPath("userData"),
        }
      : {
          projectPath: app.getPath("userData") + `/${arg.projectId}.json`,
          arg: arg,
        };

  try {
    const resp = await axios.post(
      `http://localhost:8000/${method}`,
      requestBody,
      {
        headers: { "secret-token": SECRET_TOKEN },
      }
    );
    return {
      status: true,
      response: resp.data,
    };
  } catch (error: unknown) {
    console.error(error);
    return { status: false, response: error };
  }
});

//fastApi test
ipcMain.handle("helloWorld", async (event, word) => {
  try {
    const resp: any = await axios.post(
      "http://localhost:8000/helloWorld",
      { word: word },
      {
        headers: { "secret-token": SECRET_TOKEN },
      }
    );
    return resp.data;
  } catch (error) {
    console.error(error);
    return "NG";
  }
});
