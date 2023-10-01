import React from "react";
import { Link } from "react-router-dom";
import type AW from "@/types/sites/AnimeWorld/AnimeWorld";
import { Button, Card, Image, Text } from "@mantine/core";

interface props {
    Anime: AW;
}

export const AWSearchEntry: React.FC<props> = ({ Anime }) => {
    return (
        <>
            <Link
                to={"/AWInfo/" + Anime.nome.replaceAll("/", "%2F")}
                state={Anime}
            >
                <Card withBorder w={224}>
                    <Card.Section>
                        <Image
                            src={Anime.immagine}
                            alt={Anime.nome}
                            height={320}
                        />
                    </Card.Section>
                    <Card.Section>
                        <Button fullWidth>
                            <Text title={Anime.nome} truncate>
                                {Anime.nome}
                            </Text>
                        </Button>
                    </Card.Section>
                </Card>
            </Link>
        </>
    );
};
