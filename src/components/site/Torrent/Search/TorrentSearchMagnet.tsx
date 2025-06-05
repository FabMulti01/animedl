import { Button, CopyButton } from "@mantine/core";
import { IconCopy, IconMagnet } from "@tabler/icons-react";

const TorrentSearchMagnet = ({ magnet }: { magnet: string }) => {
    return (
        <Button.Group>
            <Button
                fullWidth
                onClick={() => window.browser.open(magnet)}
                title="Apri magnet"
                size="compact-sm"
            >
                <IconMagnet />
            </Button>
            <CopyButton value={magnet}>
                {({ copied, copy }) => (
                    <Button
                        fullWidth
                        onClick={copy}
                        color={copied ? "teal" : "cyan"}
                        title="Copia magnet"
                        size="compact-sm"
                    >
                        <IconCopy />
                    </Button>
                )}
            </CopyButton>
        </Button.Group>
    );
};

export default TorrentSearchMagnet;
