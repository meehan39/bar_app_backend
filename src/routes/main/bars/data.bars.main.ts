import { Request, Response, NextFunction } from "express";

import { QueryResult, executeQuery } from "../../../db/connection";
import { NAMESPACE, Bar, Review, Location } from "../../main/resources.main";
import { info } from "../../../logging"

import { query, SearchObject, ResponseObject, QueryParams } from "./resources.bars.main";

export const postBars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let search: SearchObject = {
        searchQuery: req.body.searchQuery,
        location: req.body.location,
        radius: req.body.radius,
        minRating: req.body.minRating,
        name: req.body.name
    }

    let responseObject: ResponseObject = new ResponseObject();

    let queryParams: QueryParams = new QueryParams(search.location.latitude, search.location.longitude, search.radius, search.name)
    if (search.searchQuery) {
        query.replace('--NAME', '');
        queryParams.name = search.searchQuery;
    }

    let queryResults: QueryResult = await executeQuery(query, queryParams.toArray());

    if (queryResults.success) {
        let bars: Bar[] = [];
        let rows: any = queryResults.results;
        for (let i = 0; i < rows.length; i++) {
            let bar: Bar = {
                id: rows[i].id,
                name: rows[i].name,
                description: rows[i].description,
                numOfReviews: rows[i].ratings.numOfRatings,
                avgRating: rows[i].ratings.avgRating,
                address: rows[i].address,
                website: rows[i].website,
                location: {
                    latitude: rows[i].lattitude,
                    longitude: rows[i].longitude
                },
            }
            bars.push(bar);
        }
        responseObject.success = true;
        responseObject.message = 'Success';
        responseObject.data = bars;
    }

    info(NAMESPACE, req, responseObject.message);
    res.send(responseObject);

}