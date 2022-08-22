import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PersonAnnexFormService } from './person-annex-form.service';
import { PersonAnnexService } from '../service/person-annex.service';
import { IPersonAnnex } from '../person-annex.model';

import { PersonAnnexUpdateComponent } from './person-annex-update.component';

describe('PersonAnnex Management Update Component', () => {
  let comp: PersonAnnexUpdateComponent;
  let fixture: ComponentFixture<PersonAnnexUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let personAnnexFormService: PersonAnnexFormService;
  let personAnnexService: PersonAnnexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PersonAnnexUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PersonAnnexUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PersonAnnexUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    personAnnexFormService = TestBed.inject(PersonAnnexFormService);
    personAnnexService = TestBed.inject(PersonAnnexService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const personAnnex: IPersonAnnex = { id: 456 };

      activatedRoute.data = of({ personAnnex });
      comp.ngOnInit();

      expect(comp.personAnnex).toEqual(personAnnex);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonAnnex>>();
      const personAnnex = { id: 123 };
      jest.spyOn(personAnnexFormService, 'getPersonAnnex').mockReturnValue(personAnnex);
      jest.spyOn(personAnnexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personAnnex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: personAnnex }));
      saveSubject.complete();

      // THEN
      expect(personAnnexFormService.getPersonAnnex).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(personAnnexService.update).toHaveBeenCalledWith(expect.objectContaining(personAnnex));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonAnnex>>();
      const personAnnex = { id: 123 };
      jest.spyOn(personAnnexFormService, 'getPersonAnnex').mockReturnValue({ id: null });
      jest.spyOn(personAnnexService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personAnnex: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: personAnnex }));
      saveSubject.complete();

      // THEN
      expect(personAnnexFormService.getPersonAnnex).toHaveBeenCalled();
      expect(personAnnexService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPersonAnnex>>();
      const personAnnex = { id: 123 };
      jest.spyOn(personAnnexService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ personAnnex });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(personAnnexService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
