export type ProjectProperty = keyof IProject; 

interface IProject {
    "Project ID": string;
    Title: string;
    Type: string;
    Address: string;
    Suburb: string;
    State: string;
    Stage: string;
    Category: string;
    SubCategory: string;
    Status: string;
    Council: string;
    "Dev. Type": string;
    "Floor Area": string;
    "Site Area": string;
    Storeys: string;
    Units: string;
    "Commence Date": string;
    "Completion Date": string;
    "Last Updated": string;
    Value: string;
    Ownership: string;
    Description: string;
    Notes: string;
    "Additional Details": string;
    Lat: number;
    Long: number;
}

interface IGeometry {
    coordinates: number[];
    type: string;
}

export interface GeoJsonFeature {
    type: string;
    properties: {
        id: string;
        project: IProject;
        color: string;
    };
    geometry: IGeometry;
}

interface ILineChart {
    rawCount: number;
    label: string;
    percentage: string;
    color: string;
}

interface IBin {
    min: number;
    max: number;
    count: number;
    isMedian: boolean;
}

interface IBarChart {
    bins: Array<IBin>;
    stats: {
        minimumCount: number;
        maximumCount: number;
        maximumValue: number | string;
        minimumValue: number | string;
        median: number | string;
    };
    title: string;
    color: string;
}

export interface IFeatureCollection {
    type: string;
    features: Array<GeoJsonFeature>;
    analytics: {
        total: number;
        lineCharts: Array<ILineChart>;
        barCharts: Array<IBarChart>;
    };
}
