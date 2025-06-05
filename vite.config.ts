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
                    "mantine-core": ["@mantine/core"],
                    cheerio: ["cheerio"],
                    "react-router": ["react-router"],
                    "electron-store": ["electron-store"],
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
