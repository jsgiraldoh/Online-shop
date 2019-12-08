import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/microservicio1/category.model';
import { CategoryService } from './category.service';

@Component({
  templateUrl: './category-delete-dialog.component.html'
})
export class CategoryDeleteDialogComponent {
  category: ICategory;

  constructor(protected categoryService: CategoryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.categoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'categoryListModification',
        content: 'Deleted an category'
      });
      this.activeModal.dismiss(true);
    });
  }
}
