//Costanti utili per l'app
import { ipcRenderer } from "electron";
import json from "../package.json";

export let constants = {
    AppVersion: json.version,
    Repository: json.repository,
    Author: json.author,
    defaultDownloadDir: "",
};

// Imposta la cartella base
ipcRenderer.on("setDownloadFolder", (event, dir) => {
    constants.defaultDownloadDir = dir + "\\AnimeDL";
});
