import { ipcRenderer } from "electron";
import { observer } from "mobx-react";
import { Card, Center, Navbar, NavLink, Title, Anchor } from "@mantine/core";
import { NavLink as Link } from "react-router-dom";
import { VscArrowDown, VscGear, VscHome } from "react-icons/vsc";
import { AnimeStore } from "@/stores/AnimeStore";
import { constants } from "@/utils";

export const Sidebar = observer(() => {
    //Il numerino sotto il tasto download
    const size = AnimeStore.anime.size != undefined ? AnimeStore.anime.size : 0;

    return (
        <Navbar width={{ sm: 200 }}>
            <Navbar.Section grow>
                <Title align="center" order={2}>
                    Menu
                </Title>
                <Link to={"/"}>
                    {({ isActive }) => (
                        <NavLink
                            active={isActive}
                            label="Home"
                            icon={<VscHome />}
                        />
                    )}
                </Link>
                <Link to={"Settings"}>
                    {({ isActive }) => (
                        <NavLink
                            active={isActive}
                            label="Settings"
                            icon={<VscGear />}
                        />
                    )}
                </Link>
                <Link to={"Downloads"}>
                    {({ isActive }) => (
                        <NavLink
                            active={isActive}
                            label={"Downloads"}
                            icon={<VscArrowDown />}
                            description={size + " in lista"}
                        />
                    )}
                </Link>
            </Navbar.Section>
            <Navbar.Section>
                <Card>
                    <Center>
                        Versione:{" "}
                        <Anchor
                            title="Apri la pagina di GitHub"
                            underline={false}
                            onClick={() =>
                                ipcRenderer.invoke(
                                    "apriBrowser",
                                    constants.Repository
                                )
                            }
                        >
                            {constants.AppVersion}
                        </Anchor>
                    </Center>
                </Card>
            </Navbar.Section>
        </Navbar>
    );
});
