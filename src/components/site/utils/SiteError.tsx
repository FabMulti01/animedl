import { Code, Stack, Text } from "@mantine/core";
import { useRouteError } from "react-router";

const SiteError = () => {
    const error = useRouteError() as Error;
    return (
        <Stack h={"100%"} align="center" justify="center">
            <Text>Si é verificato un errore :(</Text>
            <Code>Dettaglio: {error.message}</Code>
        </Stack>
    );
};

export default SiteError;
