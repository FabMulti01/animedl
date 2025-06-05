import { Stack, Table, Title, Text } from "@mantine/core";
import { Preferiti } from "@stores/Preferiti";
import PreferitIPageEntry from "./FavoritesEntry";

const Favorites = () => {
    const preferiti = Preferiti.list();

    if (preferiti.length == 0) {
        return (
            <>
                <Title>Preferiti</Title>
                <Stack h={"100%"} align="center" justify="center">
                    <Text>
                        Aggiungi i preferiti dalle pagine di informazioni degli
                        anime!
                    </Text>
                </Stack>
            </>
        );
    } else {
        return (
            <>
                <Title>Preferiti</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={"auto"}>Nome</Table.Th>
                            <Table.Th w={170}>Sito</Table.Th>
                            <Table.Th w={60} />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {preferiti.map((preferito) => {
                            return (
                                <PreferitIPageEntry
                                    key={preferito[0]}
                                    titolo={preferito[0]}
                                    sito={preferito[1].sito}
                                    url={preferito[1].url}
                                />
                            );
                        })}
                    </Table.Tbody>
                    <Table.Caption>
                        La lista viene aggiornata quando si esce dalla pagina
                    </Table.Caption>
                </Table>
            </>
        );
    }
};

export default Favorites;
