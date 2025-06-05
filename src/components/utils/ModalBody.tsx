import { Card } from "@mantine/core";
import type { ReactNode } from "react";

const ModalBody = ({ messaggio }: { messaggio: ReactNode }) => {
    return <Card>{messaggio}</Card>;
};

export default ModalBody;
