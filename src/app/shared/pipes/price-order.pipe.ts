import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'priceOrder'
})
export class PriceOrderPipe implements PipeTransform {

  transform(value: Array<ICategory>,name?:string,direction?:boolean): Array<ICategory> {
    if(!value){
      return [];
    }
    if(direction){
      return value.sort((a,b)=> a[name] - b[name]);
    }
    else{
      return value.sort((a,b)=> b[name] - a[name]);

    }
  }

}
