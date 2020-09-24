import { theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";
import { mount, ReactWrapper } from "enzyme";
import { uniqBy } from "lodash";
import React from "react";
import SideBar from "../components/SideBar";
import geoJson from "../data/geoJson";

/**
 * Below is a set of arrays that contain the
 * values in the option element in the sidebar.
 * They have been mapped and sorted
 * by unique so we can use test.each() to iterate
 * over and test them.
 */
const categories = geoJson.features.map((ft) => {
    return ft.properties.project.Category;
});

const subCategories = geoJson.features.map((ft) => {
    return ft.properties.project.SubCategory;
});

categories.unshift("Sort by category");
subCategories.unshift("Sort by Sub Category");

const options = uniqBy(
    categories.concat(subCategories),
    (ft) => ft
).map((item, index) => [index, item]);

let wrapper: ReactWrapper;

beforeEach(() => {
    wrapper = mount(
        <ThemeProvider theme={theme}>
            <SideBar />
        </ThemeProvider>
    );
});

beforeEach(() => {
    wrapper = mount(
        <ThemeProvider theme={theme}>
            <SideBar />
        </ThemeProvider>
    );
});

afterEach(() => {
    wrapper.unmount();
});

describe("the sidebar component", () => {
    it("should display an h1 heading", () => {
        const heading = wrapper.find("Heading");

        expect(heading.prop("as")).toEqual("h1");

        expect(heading.text()).toBe("SideBar");
    });

    it("should render two select elements", () => {
        expect(wrapper.find("Select")).toHaveLength(2);
    });

    test.each(options)(
        "should contain options with these values",
        (index, option) => {
            expect(
                wrapper
                    .find("option")
                    .at(+index)
                    .text()
            ).toBe(option);
        }
    );
});
