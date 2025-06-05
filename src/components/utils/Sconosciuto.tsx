import { Code, Stack, Text, Title } from "@mantine/core";
import { useLocation } from "react-router";

const Sconosciuto = () => {
    const location = useLocation();
    return (
        <Stack h="100%" align="center" justify="center">
            <Title fz={60}>Pagina non trovata</Title>
            <Text>
                Sei finito in una pagina non gestita dall'app. Torna indietro e
                riprova...
            </Text>
            <Code>Path: {location.pathname}</Code>
        </Stack>
    );
};

export default Sconosciuto;
