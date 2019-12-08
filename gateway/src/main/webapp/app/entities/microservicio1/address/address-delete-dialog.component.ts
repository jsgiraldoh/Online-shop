import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAddress } from 'app/shared/model/microservicio1/address.model';
import { AddressService } from './address.service';

@Component({
  templateUrl: './address-delete-dialog.component.html'
})
export class AddressDeleteDialogComponent {
  address: IAddress;

  constructor(protected addressService: AddressService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.addressService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'addressListModification',
        content: 'Deleted an address'
      });
      this.activeModal.dismiss(true);
    });
  }
}
