import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AddressDetailComponent } from 'app/entities/microservicio1/address/address-detail.component';
import { Address } from 'app/shared/model/microservicio1/address.model';

describe('Component Tests', () => {
  describe('Address Management Detail Component', () => {
    let comp: AddressDetailComponent;
    let fixture: ComponentFixture<AddressDetailComponent>;
    const route = ({ data: of({ address: new Address(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
