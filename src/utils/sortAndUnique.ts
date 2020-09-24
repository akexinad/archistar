import _ from "lodash";
import { GeoJsonFeature, ProjectProperty } from "../types";

/**
 * this is a helper function that is used to sort and
 * return the unique geojson values that the user can then
 * select in the sidebar.
 */
export const sortAndUnique = (
    key: ProjectProperty,
    features: Array<GeoJsonFeature>
) => {
    return _.uniqBy(features, (ft) => {
        return ft.properties.project[key];
    }).map((ft) => ft.properties.project[key]);
}