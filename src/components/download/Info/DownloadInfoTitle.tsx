import { Badge, Group, Title } from "@mantine/core";

const DownloadInfoTitle = ({
    sito,
    titolo,
}: {
    sito: string;
    titolo: string;
}) => {
    return (
        <Group justify="space-between">
            <Title title={titolo} lineClamp={1}>
                {titolo}
            </Title>
            <Badge variant="outline" radius="md" size="xl">
                {sito}
            </Badge>
        </Group>
    );
};

export default DownloadInfoTitle;
