import { createContext, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import { AppShell, Box, Card, LoadingOverlay } from "@mantine/core";
import { Impostazioni } from "@stores/Impostazioni";
import Header from "@components/appshell/Header";
import Navbar from "@components/appshell/Navbar";

export const NavbarContext = createContext({
    opened: Impostazioni.collapsedNavbar,
    setOpened: (opened: boolean) => {},
});

const App = () => {
    const navigation = useNavigation();
    const [opened, setOpened] = useState(Impostazioni.collapsedNavbar);
    return (
        <NavbarContext value={{ opened, setOpened }}>
            <AppShell
                header={{ height: 36 }}
                navbar={{ width: opened ? 220 : 44, breakpoint: 0 }}
            >
                <AppShell.Header>
                    <Header />
                </AppShell.Header>
                <AppShell.Navbar style={{ transition: "200ms" }}>
                    <Navbar />
                </AppShell.Navbar>
                <AppShell.Main display="flex">
                    <Box flex={"auto"}>
                        <Card h="100%" withBorder>
                            <LoadingOverlay
                                transitionProps={{ duration: 200 }}
                                visible={navigation.state == "loading"}
                                overlayProps={{ blur: 2 }}
                            />
                            <Outlet />
                        </Card>
                    </Box>
                </AppShell.Main>
            </AppShell>
        </NavbarContext>
    );
};

export default App;
