import { IProduct } from 'app/shared/model/microservicio1/product.model';
import { ICustomer } from 'app/shared/model/microservicio1/customer.model';

export interface IWishList {
  id?: number;
  title?: string;
  restricted?: boolean;
  products?: IProduct[];
  customer?: ICustomer;
}

export class WishList implements IWishList {
  constructor(
    public id?: number,
    public title?: string,
    public restricted?: boolean,
    public products?: IProduct[],
    public customer?: ICustomer
  ) {
    this.restricted = this.restricted || false;
  }
}
