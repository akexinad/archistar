import { Box } from "@chakra-ui/core";
/**
 * Had to add this line as the linter is struggling to see that
 * I am using Map in the _handleLoad function
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Map } from "mapbox-gl";
import React, { FC } from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import { MAPBOX_TOKEN } from "../keys/mapbox";
import { useMapCtxSore } from "../store/mapStore";

export const MapContext: FC = () => {
    const [state, actions] = useMapCtxSore();

    const SYDNEY: [number, number] = [151.209879, -33.866234];

    const Map = ReactMapboxGl({
        accessToken: MAPBOX_TOKEN,
    });

    /**
     * Setting the mapbox instance in the global store
     */
    const _handleLoad = (map: Map) => {
        if (state.map) return;

        actions.setMapboxInstance(map);
    };

    return (
        <Box ml="auto">
            <Map
                // eslint-disable-next-line react/style-prop-object
                style="mapbox://styles/mapbox/light-v9"
                onStyleLoad={(map) => _handleLoad(map)}
                center={SYDNEY}
                zoom={[13]}
                containerStyle={{
                    height: "100vh",
                    width: "75vw",
                }}
            >
                {/* 
                If there are features to display in the global store,
                then iterate through them and display a marker for each feature.
                 */}
                {state.featuresToDisplay ? (
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}
                    >
                        {state.featuresToDisplay.map((pt) => (
                            <Feature
                                key={pt.properties.id}
                                coordinates={pt.geometry.coordinates}
                            />
                        ))}
                    </Layer>
                ) : (
                    <></>
                )}
            </Map>
        </Box>
    );
};
