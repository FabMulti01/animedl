import { Loader, Title, Stack, Group } from "@mantine/core";
import React from "react";

export const Caricamento: React.FC = () => {
    return (
        <Stack h="100%" align="center" justify="center">
            <Group>
                <Title>Caricamento in corso, attendere...</Title>
                <Loader />
            </Group>
        </Stack>
    );
};
