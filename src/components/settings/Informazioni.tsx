import { Button, Card, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

const Informazioni = () => {
    return (
        <Card>
            <Text>
                <b>Sviluppo:</b> FabMulti01
            </Text>
            <Text>
                <b>Testing:</b> Server Discord Emirato Puglia Sardinia
            </Text>
            <Text>
                <b>Icona:</b> ItzZizu
            </Text>
            <Text>
                <b>Electron:</b> {window.app.electronVersion()}
            </Text>
            <Text>
                <b>Node:</b> {window.app.nodeVersion()}
            </Text>
            <Text>
                <b>Chrome:</b> {window.app.chromeVersion()}
            </Text>
            <Button
                fullWidth
                title="Pagina Github"
                onClick={() => {
                    window.browser.open(
                        "https://github.com/FabMulti01/animedl"
                    );
                }}
            >
                <IconBrandGithub />
            </Button>
        </Card>
    );
};

export default Informazioni;
