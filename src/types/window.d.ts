import type { UpdateCheckResult } from "electron-updater";

declare global {
    interface Window {
        controls: {
            minimize: () => void;
            maximize: () => void;
            restore: () => void;
            close: () => void;
        };
        folder: {
            create: (path: string) => Promise<undefined>;
            open: (path: string) => void;
            select: () => Promise<string>;
            default: (path: string) => string;
        };
        browser: {
            open: (url: string) => void;
        };
        app: {
            appVersion: () => string;
            nodeVersion: () => string;
            electronVersion: () => string;
            chromeVersion: () => string;
            update: {
                check: () => Promise<UpdateCheckResult>;
                start: () => void;
            };
        };
    }
}
