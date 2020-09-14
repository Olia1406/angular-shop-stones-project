import { Data } from '@angular/router';
import { IFeedb } from '../interfaces/feedb.interface';

export class Feedb implements IFeedb  {
    constructor( 
        // public id: number,
                 public postedBy: string,
                 public message: string,
                 public date: Data
                 ){}
}