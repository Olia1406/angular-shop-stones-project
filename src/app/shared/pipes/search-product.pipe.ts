import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {
  transform(value: Array<IProduct>, seacrhParam: string): Array<IProduct> {
    if (!seacrhParam) {
      return value;
    }
    if (!value) {
      return null;
    }
    else
      return value.filter(

        prod => prod.id.toString().toLowerCase().includes(seacrhParam) ||
          prod.description.toLowerCase().includes(seacrhParam.toLowerCase()) 
          // ||
          // prod.zodiac.toLowerCase().includes(seacrhParam.toLowerCase())
          // prod.category.nameUA.toLowerCase().includes(seacrhParam.toLowerCase()) ||
          // prod.nameUA.toLowerCase().includes(seacrhParam.toLowerCase()) ||
          // prod.color.toLowerCase().includes(seacrhParam.toLowerCase()) ||
          // prod.stone.toLowerCase().includes(seacrhParam.toLowerCase()) ||


        // prod.price.toString().includes(seacrhParam)
        // prod.length.toLowerCase().includes(seacrhParam.toLowerCase()) ||
        // prod.width.toLowerCase().includes(seacrhParam.toLowerCase()) ||

      );
  }

}
