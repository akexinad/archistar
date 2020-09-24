import React, { FC } from "react";
import { Flex, theme } from "@chakra-ui/core";
import { ThemeProvider } from "@chakra-ui/core";
import "./App.css";
import SideBar from "./components/SideBar";
import { MapContext } from "./components/MapContext";

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Flex>
                <SideBar />
                <MapContext />
            </Flex>
        </ThemeProvider>
    );
};

export default App;
