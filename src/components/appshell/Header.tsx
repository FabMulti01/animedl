import { useContext, useState } from "react";
import { NavbarContext } from "src/App";
import { Box, Button, Group } from "@mantine/core";
import { Impostazioni } from "@stores/Impostazioni";
import {
    IconChevronLeft,
    IconChevronRight,
    IconMenu2,
    IconMinus,
    IconSquare,
    IconX,
} from "@tabler/icons-react";
import router from "@components/router/router";
import exitCheck from "@functions/exitCheck";

const Navigation = () => {
    const { setOpened, opened } = useContext(NavbarContext);

    function handleNavbar() {
        setOpened(!opened);
        Impostazioni.collapsedNavbar = !opened;
    }

    return (
        <>
            <Button size="compact-lg" onClick={handleNavbar}>
                <IconMenu2 />
            </Button>
            <Button
                size="compact-lg"
                onClick={() => {
                    router.navigate(-1);
                }}
            >
                <IconChevronLeft />
            </Button>
            <Button
                size="compact-lg"
                onClick={() => {
                    router.navigate(1);
                }}
            >
                <IconChevronRight />
            </Button>
        </>
    );
};

const Controls = () => {
    const [maximized, setMaximized] = useState(false);
    function handleMaximize() {
        if (maximized) {
            window.controls.restore();
        } else {
            window.controls.maximize();
        }
        setMaximized(!maximized);
    }
    return (
        <Button.Group>
            <Button size="compact-lg" onClick={window.controls.minimize}>
                <IconMinus />
            </Button>
            <Button size="compact-lg" onClick={handleMaximize}>
                <IconSquare />
            </Button>
            <Button size="compact-lg" className="exit" onClick={exitCheck}>
                <IconX />
            </Button>
        </Button.Group>
    );
};

const Header = () => {
    return (
        <Group justify="space-between" bg="cyan" className="drag">
            <Box className="no-drag">
                <Navigation />
            </Box>
            <Box className="no-drag">
                <Controls />
            </Box>
        </Group>
    );
};

export default Header;
