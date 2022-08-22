import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PersonAnnexDetailComponent } from './person-annex-detail.component';

describe('PersonAnnex Management Detail Component', () => {
  let comp: PersonAnnexDetailComponent;
  let fixture: ComponentFixture<PersonAnnexDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonAnnexDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ personAnnex: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PersonAnnexDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PersonAnnexDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load personAnnex on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.personAnnex).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
