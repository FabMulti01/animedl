import Sites from "@classes/site/Sites";
import type { MantineColorScheme } from "@mantine/core";
import Store from "electron-store";

const store = new Store({ name: "settings", clearInvalidConfig: false });

class ImpostazioniImpl {
    set downloadDir(path: string) {
        store.set("downloadDir", path);
    }

    get downloadDir(): string {
        return store.get(
            "downloadDir",
            window.folder.default("downloads")
        ) as string;
    }

    set downloadedBytes(bytes: number) {
        store.set("downloadedBytes", bytes);
    }

    get downloadedBytes(): number {
        return store.get("downloadedBytes", 0) as number;
    }

    set collapsedNavbar(collapsed: boolean) {
        store.set("collapsed", collapsed);
    }

    get collapsedNavbar(): boolean {
        return store.get("collapsed", false) as boolean;
    }

    set lastUsedSite(site: string) {
        store.set("lastUsedSite", site);
    }

    get lastUsedSite() {
        return store.get(
            "lastUsedSite",
            //Prendo il primo sito nella lista come default
            Sites.getNomi()[0]
        ) as string;
    }

    set tema(tema: MantineColorScheme) {
        store.set("tema", tema);
    }

    get tema(): MantineColorScheme {
        return store.get("tema", "auto") as MantineColorScheme;
    }

    reset() {
        store.clear();
    }
}

export const Impostazioni = new ImpostazioniImpl();
