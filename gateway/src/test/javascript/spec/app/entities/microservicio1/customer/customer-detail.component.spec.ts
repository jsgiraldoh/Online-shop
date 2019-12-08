import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerDetailComponent } from 'app/entities/microservicio1/customer/customer-detail.component';
import { Customer } from 'app/shared/model/microservicio1/customer.model';

describe('Component Tests', () => {
  describe('Customer Management Detail Component', () => {
    let comp: CustomerDetailComponent;
    let fixture: ComponentFixture<CustomerDetailComponent>;
    const route = ({ data: of({ customer: new Customer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
