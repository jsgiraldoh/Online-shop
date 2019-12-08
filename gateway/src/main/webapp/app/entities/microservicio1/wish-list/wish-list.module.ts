import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { WishListComponent } from './wish-list.component';
import { WishListDetailComponent } from './wish-list-detail.component';
import { WishListUpdateComponent } from './wish-list-update.component';
import { WishListDeleteDialogComponent } from './wish-list-delete-dialog.component';
import { wishListRoute } from './wish-list.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(wishListRoute)],
  declarations: [WishListComponent, WishListDetailComponent, WishListUpdateComponent, WishListDeleteDialogComponent],
  entryComponents: [WishListDeleteDialogComponent]
})
export class Microservicio1WishListModule {}
