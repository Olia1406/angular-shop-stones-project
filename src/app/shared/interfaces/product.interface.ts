import { ICategory } from './category.interface';
export interface IProduct {
    id: any;
    category: ICategory;
    nameEN: string;
    nameUA: string;
    description: string;
    length: string;
    width: string;
    price: number;
    image: string;
    color: any;
    zodiac: any;
    // zodiac: string;
    stone: any;
    count: number;
}