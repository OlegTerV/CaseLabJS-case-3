export interface Site{
    id: string,
    name: string,
    code: string, 
    region: string,
    location: {
        lat: number,
        lon: number
    },
}