export interface ProductProps {
    _id?: string;
    description: string;
    price: string;
    size: string;
    availability: string;
    date: string;
    version: number;
    lastModified: Date;
    hasConflicts: boolean;
    longitudine: number;
    latitudine: number;
}
