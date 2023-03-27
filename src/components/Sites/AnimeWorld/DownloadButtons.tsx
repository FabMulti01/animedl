import React from "react";
import { Text, Button, Group, Space } from "@mantine/core";
import type AW from "@/types/sites/AnimeWorld/AnimeWorld";

interface props {
    Anime: AW;
}

export const DownloadButtons: React.FC<props> = ({ Anime }) => {
    return (
        <>
            {Anime.stato == "Non rilasciato" ? (
                <>
                    <Text>L'anime non é ancora uscito!</Text>
                    <Text>
                        Controlla la data di uscita nella tabella a sinistra
                    </Text>
                </>
            ) : (
                <>
                    <Button.Group>
                        <Button
                            style={{ width: 226 }}
                            onClick={() => {
                                Anime.episodio.map((episodio) => {
                                    episodio.addEpisodio();
                                });
                            }}
                        >
                            Scarica tutto
                        </Button>
                        {Anime.stato == "In corso" ? (
                            <Button
                                style={{ width: 226 }}
                                onClick={() => {
                                    Anime.episodio.at(-1).addEpisodio();
                                }}
                            >
                                Scarica ultimo episodio
                            </Button>
                        ) : (
                            <></>
                        )}
                    </Button.Group>
                    <Space h={15} />
                    <Group>
                        {Anime.episodio.map((episodio, i) => {
                            return (
                                <Button
                                    style={{ width: 140 }}
                                    onClick={() => {
                                        episodio.addEpisodio();
                                    }}
                                    key={i}
                                >
                                    Episodio {episodio.numero}
                                </Button>
                            );
                        })}
                    </Group>
                </>
            )}
        </>
    );
};
