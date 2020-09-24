import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import { MapContext } from "../components/MapContext";

/**
 * Apart from displaying a box, there is nothing to test in this
 * component, but if functionality were to be added then we would
 *  need to mock up an instance of mapbox-gl as is done below
 */

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
    Map: jest.fn(() => ({})),
}));

let wrapper: ShallowWrapper;

beforeEach(() => {
    wrapper = shallow(<MapContext />);
});

afterEach(() => {
    wrapper.unmount();
});

describe("the map context component", () => {
    it("should contain a box and the instance of mapbox", () => {
        expect(wrapper.find("ReactMapboxGl")).toHaveLength(1);
        expect(wrapper.find("Box")).toHaveLength(1);
    });
});
