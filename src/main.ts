import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
const isDev = !app.isPackaged;
import { initRenderer } from "electron-store";
import { autoUpdater } from "electron-updater";
initRenderer();

let win: Electron.BrowserWindow;
//Serve per dire a windows che App é
app.setAppUserModelId("AnimeDL");

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 728,
        minWidth: 1024,
        minHeight: 728,
        frame: false,
        center: true,
        show: false,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    win.loadFile(__dirname + "/index.html");
}

app.whenReady().then(() => {
    createWindow();
    win.once("ready-to-show", () => {
        win.show();
        if (!isDev) {
            //https://github.com/electron-userland/electron-builder/issues/4435
            autoUpdater.autoDownload = false;
            //Controllo se ci sono aggiornamenti all'avvio
            autoUpdater.checkForUpdates();
        }
    });
});

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

//Seleziona la cartella dove salvare
ipcMain.handle("directory", () => {
    const dir = dialog.showOpenDialogSync(win, {
        properties: ["openFile", "openDirectory"],
        title: "Scegli la cartella dove salvare gli Anime",
    });
    return dir;
});
//Apre la cartella dove e salvato l'anime
ipcMain.handle("openDirectory", (event, dir) => {
    shell.openPath(dir);
});

//Apre il browser con il link dato
ipcMain.handle("apriBrowser", (event, link) => {
    shell.openExternal(link);
});

autoUpdater.on("error", (error) => {
    dialog.showErrorBox(
        "Errore durante l'aggiornamento: ",
        error == null ? "errore sconosciuto" : (error.stack || error).toString()
    );
});

autoUpdater.on("update-available", () => {
    console.log("Aggiornamento trovato!");
    dialog
        .showMessageBox({
            type: "info",
            title: "Aggiornamento disponibile!",
            message: "É disponibile un aggiornamento, vuoi aggiornare adesso?",
            buttons: ["Si", "No"],
        })
        .then((buttonIndex) => {
            if (buttonIndex) {
                autoUpdater.downloadUpdate();
            }
        });
});

autoUpdater.on("update-downloaded", () => {
    console.log("Aggiornamento scaricato");
    dialog
        .showMessageBox({
            title: "Installa aggiornamento",
            message:
                "Ho scaricato l'aggiornamento, cliccando Ok l'app verrá chiusa e aggiornata!",
        })
        .then(() => {
            setImmediate(() => autoUpdater.quitAndInstall());
        });
});
