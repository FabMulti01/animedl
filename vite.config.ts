import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";
import renderer from "vite-plugin-electron-renderer";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    cheerio: ["cheerio"],
                    "electron-store": ["electron-store"],
                    "mantine-core": ["@mantine/core"],
                    mobx: ["mobx"],
                    "react-router": ["react-router"],
                    "node-downloader-helper": ["node-downloader-helper"],
                },
            },
        },
    },
    plugins: [
        react(),
        electron({
            main: {
                entry: "main.ts",
                vite: {
                    build: { outDir: "dist" },
                },
            },
            preload: {
                input: "preload.ts",
                vite: {
                    build: { outDir: "dist" },
                },
                onstart(options) {
                    options.reload();
                },
            },
        }),
        renderer({
            resolve: { "electron-store": { type: "esm" } },
        }),
        tsconfigPaths(),
    ],
});
