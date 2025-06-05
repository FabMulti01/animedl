import { Anchor, Badge, Button, Table } from "@mantine/core";
import { IconFolder } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import type IEpisodioStore from "@interfaces/IEpisodioStore";

const DownloadList = observer(
    ({
        episodioStore,
        titolo,
    }: {
        episodioStore: IEpisodioStore;
        titolo: string;
    }) => {
        const navigate = useNavigate();
        return (
            <Table.Tr>
                <Table.Td>
                    <Anchor
                        size="sm"
                        lineClamp={1}
                        onClick={() => {
                            navigate(
                                episodioStore.sito +
                                    "/" +
                                    encodeURIComponent(titolo),
                                {
                                    viewTransition: true,
                                }
                            );
                        }}
                    >
                        {titolo}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    <Badge variant="outline" radius="md" size="lg" fullWidth>
                        {episodioStore.sito}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Button
                        onClick={() =>
                            window.folder.open(episodioStore.cartella)
                        }
                    >
                        <IconFolder />
                    </Button>
                </Table.Td>
            </Table.Tr>
        );
    }
);

export default DownloadList;
