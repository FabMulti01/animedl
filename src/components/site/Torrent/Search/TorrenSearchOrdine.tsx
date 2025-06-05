import { Button } from "@mantine/core";
import {
    IconMinus,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-react";

const TorrentSearchOrdine = ({
    scelta,
    asc,
    desc,
    handleOrdine,
    testo,
}: {
    scelta: string;
    asc: string;
    desc: string;
    handleOrdine: (scelta: string) => void;
    testo: string;
}) => {
    return (
        <Button
            onClick={() =>
                scelta == desc ? handleOrdine(asc) : handleOrdine(desc)
            }
            rightSection={
                scelta == desc ? (
                    <IconSortDescending />
                ) : scelta == asc ? (
                    <IconSortAscending />
                ) : (
                    <IconMinus />
                )
            }
        >
            {testo}
        </Button>
    );
};

export default TorrentSearchOrdine;
