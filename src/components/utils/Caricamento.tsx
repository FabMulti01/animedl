import { Loader, Stack, Title } from "@mantine/core";

const Caricamento = ({ testo = "Caricamento in corso" }: { testo: string }) => {
    return (
        <Stack h={"100%"} align="center" justify="center">
            <Title ta={"center"}>
                {testo} <Loader />
            </Title>
        </Stack>
    );
};

export default Caricamento;
