import { MantineColor, Progress } from "@mantine/core";
import React from "react";

type props = {
    color?: MantineColor;
    animate?: boolean;
    percentuale: string;
};

export const Progressbar: React.FC<props> = ({
    color = "blue",
    animate = true,
    percentuale,
}) => {
    return (
        <Progress
            size={"xl"}
            value={Number.parseFloat(percentuale)}
            color={color}
            animate={animate}
        />
    );
};
