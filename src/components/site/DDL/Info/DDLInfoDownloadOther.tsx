import type { DDLEpisodio } from "@interfaces/IDDL";
import { Button, Group, NumberInput, Text } from "@mantine/core";
import DownloadStore from "@stores/DownloadStore";
import { useContext } from "react";
import { DDLInfoContext } from "./DDLInfo";

const DDLInfoDownloadOther = ({
    scelta,
    setScelta,
    episodi,
}: {
    scelta: number;
    setScelta(scelta: number): void;
    episodi: DDLEpisodio[];
}) => {
    const { sito, url, info } = useContext(DDLInfoContext);
    return (
        <Group>
            <Button
                disabled={episodi.length > 50}
                title={
                    episodi.length > 50
                        ? "Non disponibile se l'anime ha più di 50 episodi"
                        : ""
                }
                onClick={() => {
                    episodi.forEach((episodio) => {
                        DownloadStore.add(sito, info.titolo, episodio, url);
                    });
                }}
            >
                Scarica tutti gli episodi
            </Button>
            <Text>Scarica episodio specifico</Text>
            <NumberInput
                min={0}
                value={scelta}
                allowNegative={false}
                clampBehavior="strict"
                max={parseInt(info.numeroEpisodi) || episodi.length}
                onChange={setScelta}
                placeholder="Numero episodio"
            />
        </Group>
    );
};

export default DDLInfoDownloadOther;
