import { ICategory } from './category.interface';
export interface IProduct {
    id: number;
    category: ICategory;
    nameEN: string;
    nameUA: string;
    description: string;
    length: string;
    width: string;
    price: number;
    image: string;
    color: string;
    zodiac: any;
    // zodiac: string;
    stone: string;
    count: number;
}