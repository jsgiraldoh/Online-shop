import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/microservicio1/product.model';
import { ProductService } from './product.service';
import { IWishList } from 'app/shared/model/microservicio1/wish-list.model';
import { WishListService } from 'app/entities/microservicio1/wish-list/wish-list.service';
import { ICategory } from 'app/shared/model/microservicio1/category.model';
import { CategoryService } from 'app/entities/microservicio1/category/category.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  wishlists: IWishList[];

  categories: ICategory[];
  dateAddedDp: any;
  dateModifiedDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    keywords: [],
    description: [],
    rating: [],
    dateAdded: [],
    dateModified: [],
    wishList: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected wishListService: WishListService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.wishListService
      .query()
      .subscribe((res: HttpResponse<IWishList[]>) => (this.wishlists = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.categoryService
      .query()
      .subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      title: product.title,
      keywords: product.keywords,
      description: product.description,
      rating: product.rating,
      dateAdded: product.dateAdded,
      dateModified: product.dateModified,
      wishList: product.wishList
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      keywords: this.editForm.get(['keywords']).value,
      description: this.editForm.get(['description']).value,
      rating: this.editForm.get(['rating']).value,
      dateAdded: this.editForm.get(['dateAdded']).value,
      dateModified: this.editForm.get(['dateModified']).value,
      wishList: this.editForm.get(['wishList']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
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

  trackWishListById(index: number, item: IWishList) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
