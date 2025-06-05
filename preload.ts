import { ipcRenderer } from "electron";
import type { UpdateCheckResult } from "electron-updater";

window.controls = {
    minimize: () => ipcRenderer.send("minimize"),
    maximize: () => ipcRenderer.send("maximize"),
    restore: () => ipcRenderer.send("restore"),
    close: () => ipcRenderer.send("close"),
};

window.folder = {
    open: (path: string) => ipcRenderer.send("folderOpen", path),
    create: (path: string) => ipcRenderer.invoke("folderCreate", path),
    select: (): Promise<string> => ipcRenderer.invoke("folderSelect"),
    default: (path: string) => ipcRenderer.sendSync("folderUserGet", path),
};

window.browser = {
    open: (url: string) => ipcRenderer.send("browserOpen", url),
};

window.app = {
    appVersion: () => ipcRenderer.sendSync("appVersion"),
    nodeVersion: () => ipcRenderer.sendSync("appNodeVersion"),
    electronVersion: () => ipcRenderer.sendSync("appElectronVersion"),
    chromeVersion: () => ipcRenderer.sendSync("appChromeVersion"),
    update: {
        check: (): Promise<UpdateCheckResult> =>
            ipcRenderer.invoke("updateCheck"),
        start: () => ipcRenderer.send("updateStart"),
    },
};
