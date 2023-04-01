import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell, MantineProvider, Card } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

//Utility
import { Sconosciuto } from "./Menu/Sconosciuto";

//Pagine dei siti
import { Sidebar } from "./Menu/Sidebar";
import { loadViews } from "@/types/Views";
import { Caricamento } from "./Menu/Caricamento";
import { Titlebar } from "./Menu/Titlebar";

export default function AnimeDL() {
    const views = loadViews();

    return (
        <MantineProvider
            theme={{
                colorScheme: "dark",
                fontFamily: "Arial",
                primaryColor: "cyan",
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <HashRouter>
                <AppShell navbar={<Sidebar />} header={<Titlebar />}>
                    <Routes>
                        {views.map((view, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={view.path}
                                    element={
                                        <Card withBorder h={"100%"}>
                                            <Suspense
                                                fallback={<Caricamento />}
                                            >
                                                <view.component />
                                            </Suspense>
                                        </Card>
                                    }
                                />
                            );
                        })}
                        <Route path="*" element={<Sconosciuto />} />
                    </Routes>
                </AppShell>
            </HashRouter>
            <Notifications />
        </MantineProvider>
    );
}
