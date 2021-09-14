import fs from "fs";
import { Location, Bar } from "../resources.main";
import { MainResponseObject, Params } from "../../../resources";

export let query = fs.readFileSync('src/routes/main/bars/queries/bars.sql', 'utf-8');

export interface SearchObject {
    searchQuery: string
    location: Location
    radius: number
    minRating: number
    name?: string
}

export interface QueryParams {
    latitude: string
    longitude: string
    radius: string
    name?: string

}

export class ResponseObject implements MainResponseObject {
    success: boolean = false;
    message: string = '';
    data: Bar[] = [];
}

export class QueryParams implements Params {
    latitude: string;
    longitude: string;
    radius: string;
    name?: string;
    constructor(latitude: number, longitude: number, radius: number, name?: string) {
        this.latitude = latitude.toString();
        this.longitude = longitude.toString();
        this.radius = radius.toString();
        this.name = name;
    }
    toArray = (): string[] => {
        let params = [this.latitude, this.longitude, this.radius];
        if (this.name) params.push(this.name);
        return params;
    }
}