import { Flex, Title, Text } from "@mantine/core";
import TorrentInfoMagnet from "./TorrentInfoMagnet.js";

const TorrentInfoLeft = ({
    data,
    peso,
    seed,
    magnet,
}: {
    data: string;
    peso: string;
    seed: string;
    magnet: string;
}) => {
    return (
        <Flex direction="column" gap="md">
            <Title order={3} ta="center">
                Informazioni
            </Title>
            <Text>
                <b>Data:</b> {data}
            </Text>
            <Text>
                <b>Dimensione:</b> {peso}
            </Text>
            <Text>
                <b>Seed:</b> {seed}
            </Text>
            <TorrentInfoMagnet magnet={magnet} />
        </Flex>
    );
};

export default TorrentInfoLeft;
