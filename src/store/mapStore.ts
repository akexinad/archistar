import { Map } from "mapbox-gl";
import { createStore, createHook, StoreActionApi } from "react-sweet-state";

import { GeoJsonFeature, IFeatureCollection, ProjectProperty } from "../types";

import geoJson from "../data/geoJson";

/**
 * 
 * ================
 * THE GLOBAL STORE
 * ================
 * 
 * sweet-state is heavily inspired by Redux mixed with Context API concepts. 
 * It has render-prop components or hooks, connected to Store instances
 * (defined as actions and initial state), receiving the Store state
 * (or part of it) and the actions as a result.
 * 
 * See: https://atlassian.github.io/react-sweet-state/#/
 * 
 */

type State = {
    geoJson: IFeatureCollection;
    map: Map | null;
    featuresToDisplay: Array<GeoJsonFeature>;
    featuresOnDisplay: Array<string>;
};

const initialState: State = {
    geoJson,
    map: null,
    featuresToDisplay: [],
    featuresOnDisplay: [],
};

type StoreApi = StoreActionApi<State>;

type Actions = typeof actions;

const actions = {
    setMapboxInstance: (map: Map) => ({ setState, getState }: StoreApi) => {
        const state = getState();

        if (state.map) return;

        setState({
            map,
        });
    },
    displayFeatures: (key: ProjectProperty, value: string) => ({
        setState,
        getState,
    }: StoreApi) => {
        const state = getState();
        const { geoJson } = state;

        const filtered = geoJson.features.filter((ft) => {
            return ft.properties.project[key] === value;
        });

        setState({
            featuresToDisplay: filtered,
        });
    },

    loadAllMarkers: () => ({ setState, getState }: StoreApi) => {
        const state = getState();
        const { map, geoJson } = state;

        if (!map) {
            throw new Error("Map instance not stored in state");
        }

        setState({
            featuresToDisplay: geoJson.features,
        });
    },
};

const Store = createStore<State, Actions>({
    initialState,
    actions,
});

export const useMapCtxSore = createHook(Store);
