import { Box, Heading, Select } from "@chakra-ui/core";
import React, { FC, ReactText, useEffect, useRef, useState } from "react";
import { useMapCtxSore } from "../store/mapStore";
import { ProjectProperty } from "../types";
import { sortAndUnique } from "../utils/sortAndUnique";

const SideBar: FC = () => {
    const [state, actions] = useMapCtxSore();
    const [byCatergory, setByCategory] = useState<Array<ReactText>>([]);
    const [bySubCat, setBySubCat] = useState<Array<ReactText>>([]);
    /**
     * useRef is used here to return the value of the Select element that is not in
     * use back to null.
     * 
     * See: https://reactjs.org/docs/hooks-reference.html#useref
     */
    const catSelect = useRef<HTMLSelectElement>(null);
    const subCatSelect = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const byCatergory = sortAndUnique("Category", state.geoJson.features);
        const bySubCat = sortAndUnique("SubCategory", state.geoJson.features);

        setByCategory(byCatergory);
        setBySubCat(bySubCat);
    }, [state, actions.displayFeatures]);

    /**
     * Event handlers for the select elements
     */
    
    const _handleCategorySelection = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: ProjectProperty
    ) => {
        const value = e.target.value;

        actions.displayFeatures(key, value);

        if (!subCatSelect.current) return;
        subCatSelect.current.value = "";
    };

    const _handleSubCategorySelection = (
        e: React.ChangeEvent<HTMLSelectElement>,
        key: ProjectProperty
    ) => {
        const value = e.target.value;

        actions.displayFeatures(key, value);

        if (!catSelect.current) return;
        catSelect.current.value = "";
    };

    return (
        <Box backgroundColor={"lightgray"}>
            <Heading as="h1" textAlign="center">
                SideBar
            </Heading>
            <br />
            <Select
                placeholder="Sort by category"
                onChange={(e) => _handleCategorySelection(e, "Category")}
                ref={catSelect}
            >
                {byCatergory.map((cat, i) => (
                    <option key={i} value={cat}>
                        {cat}
                    </option>
                ))}
            </Select>

            <Select
                placeholder="Sort by Sub Category"
                onChange={(e) => _handleSubCategorySelection(e, "SubCategory")}
                ref={subCatSelect}
            >
                {bySubCat.map((cat, i) => (
                    <option key={i} value={cat}>
                        {cat}
                    </option>
                ))}
            </Select>
        </Box>
    );
};

export default SideBar;