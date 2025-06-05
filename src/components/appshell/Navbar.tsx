import { NavLink } from "react-router";
import { Flex, NavLink as Nav } from "@mantine/core";
import {
    IconDownload,
    IconHome,
    IconSettings,
    IconStar,
} from "@tabler/icons-react";
import DownloadStore from "@stores/DownloadStore";

const Navbar = () => {
    return (
        <Flex direction="column" h={"100%"}>
            <NavLink viewTransition to={"/"} title="Home">
                {({ isActive }) => (
                    <Nav
                        component="div"
                        active={isActive}
                        leftSection={<IconHome />}
                        label="Home"
                    />
                )}
            </NavLink>
            <NavLink viewTransition to={"Settings"} title="Impostazioni">
                {({ isActive }) => (
                    <Nav
                        component="div"
                        active={isActive}
                        leftSection={<IconSettings />}
                        label="Impostazioni"
                    />
                )}
            </NavLink>
            <NavLink viewTransition to={"Preferiti"} title="Preferiti">
                {({ isActive }) => (
                    <Nav
                        component="div"
                        active={isActive}
                        leftSection={<IconStar />}
                        label="Preferiti"
                    />
                )}
            </NavLink>
            <NavLink viewTransition to={"Download"} title="Download">
                {({ isActive }) => (
                    <Nav
                        component="div"
                        active={isActive}
                        leftSection={<IconDownload />}
                        label="Download"
                    />
                )}
            </NavLink>
        </Flex>
    );
};

export default Navbar;
