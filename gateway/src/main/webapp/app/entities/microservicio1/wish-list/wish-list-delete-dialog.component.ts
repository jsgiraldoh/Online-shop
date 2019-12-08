import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWishList } from 'app/shared/model/microservicio1/wish-list.model';
import { WishListService } from './wish-list.service';

@Component({
  templateUrl: './wish-list-delete-dialog.component.html'
})
export class WishListDeleteDialogComponent {
  wishList: IWishList;

  constructor(protected wishListService: WishListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.wishListService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'wishListListModification',
        content: 'Deleted an wishList'
      });
      this.activeModal.dismiss(true);
    });
  }
}
