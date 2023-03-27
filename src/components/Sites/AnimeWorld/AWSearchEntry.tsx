import React from "react";
import { Link } from "react-router-dom";
import type AW from "@/types/sites/AnimeWorld/AnimeWorld";
import { Button, Card, Image, Text } from "@mantine/core";

interface props {
    AW: AW;
}

export const AWSearchEntry: React.FC<props> = ({ AW }) => {
    return (
        <>
            <Link
                to={"/AWInfo/" + AW.nome.replaceAll("/", "%2F")}
                state={[AW.nome, AW.link, AW.immagine]}
            >
                <Card withBorder w={224}>
                    <Card.Section>
                        <Image src={AW.immagine} alt={AW.nome} height={320} />
                    </Card.Section>
                    <Card.Section>
                        <Button fullWidth>
                            <Text title={AW.nome} truncate>
                                {AW.nome}
                            </Text>
                        </Button>
                    </Card.Section>
                </Card>
            </Link>
        </>
    );
};
