import { Center, Pagination } from "@mantine/core";

const TorrentSearchPagine = ({
    pagine,
    scelta,
    handlePagine,
}: {
    pagine: number;
    scelta: number;
    handlePagine(scelta: number): void;
}) => {
    return (
        <Center>
            <Pagination total={pagine} value={scelta} onChange={handlePagine} />
        </Center>
    );
};

export default TorrentSearchPagine;
