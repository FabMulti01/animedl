import type { TorrentLingua } from "@interfaces/ITorrent";
import { SegmentedControl, Title } from "@mantine/core";

const TorrentSearchLingua = ({
    lingua,
    handleLingua,
    scelta,
}: {
    lingua: TorrentLingua;
    handleLingua(lingua: string): void;
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
                onChange={(value) => {
                    handleLingua(value);
                }}
                data={[
                    { label: "Tutto", value: lingua.TUTTO },
                    { label: "Multilingua", value: lingua.MULTILINGUA },
                    { label: "Italiano", value: lingua.ITALIANO },
                ]}
            />
        </>
    );
};

export default TorrentSearchLingua;
