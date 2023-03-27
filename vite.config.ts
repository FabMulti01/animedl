import { rmSync } from "node:fs";
import path from "node:path";
import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin";
import renderer from "vite-plugin-electron-renderer";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    rmSync("dist", { recursive: true, force: true });

    const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;

    return {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src"),
            },
        },
        plugins: [
            react(),
            electron({
                include: ["main.ts"],
                outDir: "dist",
                transformOptions: { sourcemap },
            }),
            tsConfigPaths(),
            renderer(),
        ],
    };
});
