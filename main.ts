import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { initRenderer } from "electron-store";
import { autoUpdater } from "electron-updater";

let win: Electron.BrowserWindow;

//Store
initRenderer();

//Serve per dire a windows che App é
app.setAppUserModelId(app.getName());

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 1024,
        minHeight: 768,
        frame: false,
        center: true,
        show: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //Devo disabilitarlo per avere l'accesso con http request
            webSecurity: false,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        win.loadFile("dist/index.html");
    }
}
if (app.requestSingleInstanceLock({ additionalData: "AnimeDL" })) {
    app.whenReady().then(() => {
        createWindow();
        win.once("ready-to-show", () => {
            win.show();
            //Imposto il path di download di sistema
            win.webContents.send("setDownloadFolder", app.getPath("downloads"));
        });
    });
} else {
    app.quit();
}
//Controlli nella Topnav
ipcMain.handle("minimize", () => {
    win.minimize();
});

ipcMain.handle("maximize", () => {
    win.maximize();
});
ipcMain.handle("restore", () => {
    win.restore();
});
ipcMain.handle("close", () => {
    win.close();
});

ipcMain.handle("getDownloadFolder", () => {
    return app.getPath("downloads") + "\\AnimeDL";
});

//Seleziona la cartella dove salvare
ipcMain.handle("selectDir", () => {
    const dir = dialog.showOpenDialogSync(win, {
        properties: ["openDirectory"],
        title: "Scegli la cartella dove salvare gli Anime",
    });
    return dir;
});

//Apre la cartella dove é salvato l'anime
ipcMain.handle("openDir", (event, dir) => {
    shell.openPath(dir);
});

//Apre il browser con il link dato
ipcMain.handle("apriBrowser", (event, link) => {
    shell.openExternal(link);
});

//Messaggio info custom
ipcMain.handle("messaggioInfo", (event, title, message) => {
    dialog.showMessageBox({ title: title, message: message });
});

//Notifica
ipcMain.handle("notifica", (event, title, body) => {
    new Notification(title, { body: body });
});

//Aggiornamento
ipcMain.handle("checkUpdate", () => {
    autoUpdater.checkForUpdates();
});

//Utility per aggiornamento
autoUpdater.on("update-available", () => {
    dialog
        .showMessageBox({
            type: "info",
            title: "Aggiornamento disponibile!",
            message:
                "É disponibile un aggiornamento, vuoi aprire la pagina di GitHub?",
            buttons: ["Si", "No"],
        })
        .then((buttonIndex) => {
            if (buttonIndex) {
                shell.openPath(
                    "https://github.com/FabMulti01/animedl/releases"
                );
            }
        });
});

autoUpdater.on("update-not-available", () => {
    dialog.showMessageBox({
        type: "info",
        title: "Nessun aggiornamento disponibile",
        message: "Stai già utilizzando l'ultima versione dell'applicazione!",
    });
});
