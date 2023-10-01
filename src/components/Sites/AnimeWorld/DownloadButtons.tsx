import React from "react";
import { Text, Button, Group, Space } from "@mantine/core";
import type AW from "@/types/sites/AnimeWorld/AnimeWorld";
import { AnimeDL } from "@/types/AnimeDL";
import { AnimeStore } from "@/stores/AnimeStore";

interface props {
    Anime: AW;
}

export const DownloadButtons: React.FC<props> = ({ Anime }) => {
    //Aggiunge tutti gli episodi in lista
    function downloadHandler() {
        Anime.episodio.forEach((episodio) => {
            AnimeStore.addEpisodio(Anime.nome, Anime.cartella, episodio);
        });
    }

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
                                if (Anime.episodio.size > 50) {
                                    AnimeDL.conferma(
                                        "Attenzione!",
                                        "Stai cercando di scaricare " +
                                            Anime.episodio.size +
                                            " episodi! Continuando l'applicazione potrebbe diventare instabile, sei sicuro?",
                                        () => downloadHandler(),
                                        "Continua"
                                    );
                                } else {
                                    downloadHandler();
                                }
                            }}
                        >
                            Scarica tutto
                        </Button>
                        {Anime.stato == "In corso" ? (
                            <Button
                                style={{ width: 226 }}
                                onClick={() => {
                                    AnimeStore.addEpisodio(
                                        Anime.nome,
                                        Anime.cartella,
                                        Anime.episodio.get(
                                            Anime.episodio.size.toString()
                                        )
                                    );
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
                        {Array.from(Anime.episodio.values()).map((episodio) => {
                            return (
                                <Button
                                    style={{ width: 140 }}
                                    onClick={() => {
                                        AnimeStore.addEpisodio(
                                            episodio.nome,
                                            Anime.cartella,
                                            episodio
                                        );
                                    }}
                                    key={episodio.numero}
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
