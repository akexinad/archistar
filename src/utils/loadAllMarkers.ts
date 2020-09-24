import { Map } from "mapbox-gl";
import { FeatureCollection } from "../../node_modules/@types/geojson";

// 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',

export default (map: Map, data: FeatureCollection) => {
    map.loadImage("./custom_marker.png", function (
        error: string,
        image: HTMLImageElement
    ) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        // Add a GeoJSON source with 2 points
        // @ts-ignore
        map.addSource("points", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                //@ts-ignore
                features: data.features,
            },
        });

        // Add a symbol layer
        map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
                "icon-image": "custom-marker",
                // get the title name from the source's "title" property
                // 'text-field': ['get', 'title'],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 1.25],
                "text-anchor": "top",
            },
        });
    });
};
