import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import { mkdirSync } from "fs";
import path from "path";
import Store from "electron-store";

//Main window
let win: BrowserWindow;

//Store
Store.initRenderer();

const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 1024,
        minHeight: 768,
        frame: false,
        center: true,
        show: false,
        fullscreenable: false,
        icon: "icon.png",
        webPreferences: {
            devTools: false,
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(app.getAppPath(), "dist/preload.mjs"),
        },
    });
    //Impedisco all'utente di navigare in altri link dall'app
    win.webContents.on("will-navigate", (event) => {
        event.preventDefault();
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        win.loadFile("dist/index.html");
    }
};

//Singola istanza
if (app.requestSingleInstanceLock({ additionalData: "AnimeDL" })) {
    app.whenReady().then(() => {
        createWindow();
        win.once("ready-to-show", () => {
            win.show();
        });
    });
} else {
    app.quit();
}

//Controlli della finestra
ipcMain.on("minimize", () => {
    win.minimize();
});

ipcMain.on("maximize", () => {
    win.maximize();
});

ipcMain.on("restore", () => {
    win.restore();
});

ipcMain.once("close", () => {
    win.close();
});

//Controlli per le cartelle
ipcMain.on("folderOpen", (event, path: string) => {
    shell.openPath(path);
});

ipcMain.handle("folderCreate", (event, path: string) => {
    return mkdirSync(path, { recursive: true });
});

ipcMain.handle("folderSelect", () => {
    try {
        return dialog.showOpenDialogSync(win, {
            properties: ["openDirectory"],
        })[0];
    } catch {
        return null;
    }
});

ipcMain.on("folderUserGet", (event, path) => {
    event.returnValue = app.getPath(path);
});

//Browser
ipcMain.on("browserOpen", (event, url) => {
    shell.openExternal(url);
});

//App
ipcMain.on("appVersion", (event) => {
    event.returnValue = app.getVersion();
});

ipcMain.on("appNodeVersion", (event) => {
    event.returnValue = process.versions.node;
});

ipcMain.on("appElectronVersion", (event) => {
    event.returnValue = process.versions.electron;
});

ipcMain.on("appChromeVersion", (event) => {
    event.returnValue = process.versions.chrome;
});

ipcMain.on("appReset", () => {
    win.reload();
});

//Update
autoUpdater.autoDownload = false;
autoUpdater.disableWebInstaller = true;
//autoUpdater.forceDevUpdateConfig = true;

ipcMain.handle("updateCheck", () => {
    try {
        return autoUpdater.checkForUpdates().then((info) => {
            return info;
        });
    } catch (e) {
        return e.message;
    }
});

ipcMain.on("updateStart", () => {
    autoUpdater.downloadUpdate();
});

autoUpdater.on("download-progress", (info) => {
    win.webContents.send("downloadProgress", info);
});

autoUpdater.on("update-downloaded", (event) => {
    win.webContents.send("downloadCompleted");
});

autoUpdater.on("error", (error) => {
    win.webContents.send("downloadError", error.message);
});
