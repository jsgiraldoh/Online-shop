import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WishList } from 'app/shared/model/microservicio1/wish-list.model';
import { WishListService } from './wish-list.service';
import { WishListComponent } from './wish-list.component';
import { WishListDetailComponent } from './wish-list-detail.component';
import { WishListUpdateComponent } from './wish-list-update.component';
import { IWishList } from 'app/shared/model/microservicio1/wish-list.model';

@Injectable({ providedIn: 'root' })
export class WishListResolve implements Resolve<IWishList> {
  constructor(private service: WishListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWishList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((wishList: HttpResponse<WishList>) => wishList.body));
    }
    return of(new WishList());
  }
}

export const wishListRoute: Routes = [
  {
    path: '',
    component: WishListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.microservicio1WishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WishListDetailComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.microservicio1WishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WishListUpdateComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.microservicio1WishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WishListUpdateComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.microservicio1WishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
