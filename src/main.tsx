import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { RouterProvider } from "react-router";
import { Impostazioni } from "@stores/Impostazioni";
import router from "@components/router/router";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import "./styles/custom.css";
import { Notifications } from "@mantine/notifications";
import Update from "@components/update/Update";

const theme = createTheme({
    fontFamily: "Arial",
    primaryColor: "cyan",
});

if (Impostazioni.checkForUpdate) {
    Update.check(false);
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider defaultColorScheme={Impostazioni.tema} theme={theme}>
            <Notifications />
            <ModalsProvider>
                <RouterProvider router={router} />
            </ModalsProvider>
        </MantineProvider>
    </StrictMode>
);
