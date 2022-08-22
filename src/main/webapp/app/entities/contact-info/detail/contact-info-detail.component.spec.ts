import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ContactInfoDetailComponent } from './contact-info-detail.component';

describe('ContactInfo Management Detail Component', () => {
  let comp: ContactInfoDetailComponent;
  let fixture: ComponentFixture<ContactInfoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInfoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ contactInfo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ContactInfoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ContactInfoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load contactInfo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.contactInfo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
