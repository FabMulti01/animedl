import { Stack, Text } from "@mantine/core";

const SiteNoResult = ({ titolo }: { titolo: string }) => {
    return (
        <Stack h={"100%"} align="center" justify="center">
            <Text>
                Nessun risultato per <i>{titolo}</i>
            </Text>
        </Stack>
    );
};

export default SiteNoResult;
