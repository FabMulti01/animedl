import { Button } from "@mantine/core";
import { DH_STATES, DownloaderHelper } from "node-downloader-helper";
import { observer } from "mobx-react-lite";
import {
    IconPlayerPause,
    IconPlayerPlay,
    IconPlayerStop,
    IconTrash,
} from "@tabler/icons-react";
import DownloadStore from "@stores/DownloadStore.js";

const Riprendi = ({ stream }: { stream: DownloaderHelper }) => {
    return (
        <Button onClick={() => stream.resume()}>
            <IconPlayerPlay />
        </Button>
    );
};

const Pausa = ({ stream }: { stream: DownloaderHelper }) => {
    return (
        <Button onClick={() => stream.pause()}>
            <IconPlayerPause />
        </Button>
    );
};

const Stop = ({ stream }: { stream: DownloaderHelper }) => {
    return (
        <Button onClick={() => stream.stop()}>
            <IconPlayerStop />
        </Button>
    );
};

const Elimina = ({ titolo, numero }: { titolo: string; numero: string }) => {
    return (
        <Button
            onClick={() => {
                DownloadStore.delete(titolo, numero);
            }}
        >
            <IconTrash />
        </Button>
    );
};

const DownloadInfoStateButtons = observer(
    ({
        titolo,
        numero,
        stato,
        stream,
    }: {
        titolo: string;
        numero: string;
        stato: string;
        stream: DownloaderHelper;
    }) => {
        switch (stato) {
            case DH_STATES.STOPPED:
            case DH_STATES.FINISHED:
            case DH_STATES.FAILED: {
                return <Elimina numero={numero} titolo={titolo} />;
            }
            case DH_STATES.PAUSED: {
                return (
                    <Button.Group>
                        <Riprendi stream={stream} />
                        <Stop stream={stream} />
                    </Button.Group>
                );
            }
            default: {
                return (
                    <Button.Group>
                        <Pausa stream={stream} />
                        <Stop stream={stream} />
                    </Button.Group>
                );
            }
        }
    }
);

export default DownloadInfoStateButtons;
