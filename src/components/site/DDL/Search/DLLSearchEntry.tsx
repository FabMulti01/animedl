import type { DDLBase } from "@interfaces/IDDL";
import { Button, Card, Image, Text } from "@mantine/core";
import { Link } from "react-router";

const DDLSearchEntry = ({ anime }: { anime: DDLBase }) => {
    return (
        <Link
            to={"/DDL/info/" + anime.sito + "/" + encodeURIComponent(anime.url)}
            key={anime.titolo}
            viewTransition
        >
            <Card w={212}>
                <Card.Section>
                    <Image h={300} src={anime.locandina} />
                </Card.Section>
                <Card.Section>
                    <Button radius={0} fullWidth title={anime.titolo}>
                        <Text truncate>{anime.titolo}</Text>
                    </Button>
                </Card.Section>
            </Card>
        </Link>
    );
};

export default DDLSearchEntry;
