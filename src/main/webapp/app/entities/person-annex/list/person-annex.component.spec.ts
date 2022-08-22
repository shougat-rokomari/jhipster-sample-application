import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PersonAnnexService } from '../service/person-annex.service';

import { PersonAnnexComponent } from './person-annex.component';

describe('PersonAnnex Management Component', () => {
  let comp: PersonAnnexComponent;
  let fixture: ComponentFixture<PersonAnnexComponent>;
  let service: PersonAnnexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'person-annex', component: PersonAnnexComponent }]), HttpClientTestingModule],
      declarations: [PersonAnnexComponent],
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
      .overrideTemplate(PersonAnnexComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PersonAnnexComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PersonAnnexService);

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
    expect(comp.personAnnexes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to personAnnexService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPersonAnnexIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPersonAnnexIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
