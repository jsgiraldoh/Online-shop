import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        loadChildren: () => import('./microservicio1/category/category.module').then(m => m.Microservicio1CategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./microservicio1/product/product.module').then(m => m.Microservicio1ProductModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./microservicio1/customer/customer.module').then(m => m.Microservicio1CustomerModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./microservicio1/address/address.module').then(m => m.Microservicio1AddressModule)
      },
      {
        path: 'wish-list',
        loadChildren: () => import('./microservicio1/wish-list/wish-list.module').then(m => m.Microservicio1WishListModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
