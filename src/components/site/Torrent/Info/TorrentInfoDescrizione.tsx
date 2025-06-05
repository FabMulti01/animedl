import { Paper, Title } from "@mantine/core";

const TorrentInfoDescrizione = ({ descrizione }: { descrizione: string }) => {
    return (
        <>
            <Title order={3} ta="center">
                Descrizione
            </Title>
            <Paper>
                <div
                    className="torrentInfo"
                    dangerouslySetInnerHTML={{
                        __html: descrizione,
                    }}
                ></div>
            </Paper>
        </>
    );
};

export default TorrentInfoDescrizione;
