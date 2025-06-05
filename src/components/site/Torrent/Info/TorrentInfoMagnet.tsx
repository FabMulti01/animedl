import { Button, CopyButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCopy, IconMagnet } from "@tabler/icons-react";

const TorrentInfoMagnet = ({ magnet }: { magnet: string }) => {
    return (
        <Button.Group>
            <Button
                fullWidth
                title="Apri il magnet"
                onClick={() => {
                    notifications.show({
                        title: "Info",
                        message: "Apertura del magnet in corso...",
                        withBorder: true,
                    });
                    window.browser.open(magnet);
                }}
            >
                <IconMagnet />
            </Button>
            <CopyButton value={magnet}>
                {({ copied, copy }) => (
                    <Button
                        fullWidth
                        title="Copia il magnet"
                        color={copied ? "teal" : "cyan"}
                        onClick={() => {
                            notifications.show({
                                title: "Info",
                                message: "Magnet copiato con successo!",
                                withBorder: true,
                            });
                            copy();
                        }}
                    >
                        <IconCopy />
                    </Button>
                )}
            </CopyButton>
        </Button.Group>
    );
};

export default TorrentInfoMagnet;
