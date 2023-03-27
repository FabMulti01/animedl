import { ipcRenderer } from "electron";
import React, { useState } from "react";
import {
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeClose,
    VscArrowLeft,
} from "react-icons/vsc";
import { Header, Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ExitCheck from "@/ExitCheck";

export const Titlebar: React.FC = () => {
    const navigate = useNavigate();
    const [maximized, isMaximized] = useState(false);

    function handleMaximize() {
        if (maximized) {
            ipcRenderer.invoke("restore");
        } else {
            ipcRenderer.invoke("maximize");
        }
        isMaximized(!maximized);
    }

    return (
        <Header height={32} className="drag" bg={"cyan"}>
            <Flex>
                <div style={{ width: "50%" }}>
                    <Button
                        radius={0}
                        className="titlebar"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <VscArrowLeft />
                    </Button>
                </div>
                <div style={{ width: "50%" }}>
                    <Button.Group style={{ float: "right" }}>
                        <Button
                            radius={0}
                            className="titlebar"
                            onClick={() => ipcRenderer.invoke("minimize")}
                        >
                            <VscChromeMinimize />
                        </Button>
                        <Button className="titlebar" onClick={handleMaximize}>
                            <VscChromeMaximize />
                        </Button>
                        <Button
                            radius={0}
                            className="titlebar"
                            onClick={ExitCheck}
                            color={"red"}
                        >
                            <VscChromeClose />
                        </Button>
                    </Button.Group>
                </div>
            </Flex>
        </Header>
    );
};
