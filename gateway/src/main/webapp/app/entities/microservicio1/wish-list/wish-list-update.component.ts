import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IWishList, WishList } from 'app/shared/model/microservicio1/wish-list.model';
import { WishListService } from './wish-list.service';
import { ICustomer } from 'app/shared/model/microservicio1/customer.model';
import { CustomerService } from 'app/entities/microservicio1/customer/customer.service';

@Component({
  selector: 'jhi-wish-list-update',
  templateUrl: './wish-list-update.component.html'
})
export class WishListUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomer[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    restricted: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected wishListService: WishListService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ wishList }) => {
      this.updateForm(wishList);
    });
    this.customerService
      .query()
      .subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(wishList: IWishList) {
    this.editForm.patchValue({
      id: wishList.id,
      title: wishList.title,
      restricted: wishList.restricted,
      customer: wishList.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const wishList = this.createFromForm();
    if (wishList.id !== undefined) {
      this.subscribeToSaveResponse(this.wishListService.update(wishList));
    } else {
      this.subscribeToSaveResponse(this.wishListService.create(wishList));
    }
  }

  private createFromForm(): IWishList {
    return {
      ...new WishList(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      restricted: this.editForm.get(['restricted']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWishList>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
