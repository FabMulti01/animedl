import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell, MantineProvider, Card } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

//Utility
import { Sconosciuto } from "./Menu/Sconosciuto";

//Pagine dei siti
import { Sidebar } from "./Menu/Sidebar";
import { loadPages } from "@/types/Pages";
import { Caricamento } from "./Menu/Caricamento";
import { Titlebar } from "./Menu/Titlebar";

export default function AnimeDL() {
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
                <ModalsProvider>
                    <AppShell navbar={<Sidebar />} header={<Titlebar />}>
                        <Routes>
                            {loadPages().map((Page, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={Page.path}
                                        element={
                                            <Card withBorder h={"100%"}>
                                                <Suspense
                                                    fallback={<Caricamento />}
                                                >
                                                    <Page.component />
                                                </Suspense>
                                            </Card>
                                        }
                                    />
                                );
                            })}
                            <Route path="*" element={<Sconosciuto />} />
                        </Routes>
                    </AppShell>
                </ModalsProvider>
            </HashRouter>
            <Notifications />
        </MantineProvider>
    );
}
