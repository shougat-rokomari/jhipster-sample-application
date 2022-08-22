import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ContactInfoService } from '../service/contact-info.service';

import { ContactInfoComponent } from './contact-info.component';

describe('ContactInfo Management Component', () => {
  let comp: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;
  let service: ContactInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'contact-info', component: ContactInfoComponent }]), HttpClientTestingModule],
      declarations: [ContactInfoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ContactInfoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactInfoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ContactInfoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.contactInfos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to contactInfoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getContactInfoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getContactInfoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
