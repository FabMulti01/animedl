import type { TorrentLingua } from "@interfaces/ITorrent";
import { SegmentedControl, Title } from "@mantine/core";

const TorrentSearchLingua = ({
    lingua,
    setLingua,
    scelta,
}: {
    lingua: TorrentLingua;
    setLingua(lingua: string): void;
    scelta: string;
}) => {
    return (
        <>
            <Title order={2}>Passa ad un'altra lingua</Title>
            <SegmentedControl
                fullWidth
                color="cyan"
                transitionDuration={0}
                value={scelta}
                onChange={setLingua}
                data={[
                    { label: "Tutto", value: lingua.tutto },
                    { label: "Multilingua", value: lingua.multilingua },
                    { label: "Italiano", value: lingua.italiano },
                ]}
            />
        </>
    );
};

export default TorrentSearchLingua;
