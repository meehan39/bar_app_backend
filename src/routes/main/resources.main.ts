export const NAMESPACE: string = 'Main';

export interface Location {
    latitude: number
    longitude: number
}

export interface Review {
    rating: number
    review: string
}

export interface Bar {
    id: number
    name: string
    description: string
    numOfReviews: number
    avgRating: number
    address: string
    location: Location
    website: string
}
