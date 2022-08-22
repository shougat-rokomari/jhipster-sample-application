import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PersonFormService } from './person-form.service';
import { PersonService } from '../service/person.service';
import { IPerson } from '../person.model';
import { IPersonAnnex } from 'app/entities/person-annex/person-annex.model';
import { PersonAnnexService } from 'app/entities/person-annex/service/person-annex.service';

import { PersonUpdateComponent } from './person-update.component';

describe('Person Management Update Component', () => {
  let comp: PersonUpdateComponent;
  let fixture: ComponentFixture<PersonUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let personFormService: PersonFormService;
  let personService: PersonService;
  let personAnnexService: PersonAnnexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PersonUpdateComponent],
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
      .overrideTemplate(PersonUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PersonUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    personFormService = TestBed.inject(PersonFormService);
    personService = TestBed.inject(PersonService);
    personAnnexService = TestBed.inject(PersonAnnexService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call personAnnex query and add missing value', () => {
      const person: IPerson = { id: 456 };
      const personAnnex: IPersonAnnex = { id: 40967 };
      person.personAnnex = personAnnex;

      const personAnnexCollection: IPersonAnnex[] = [{ id: 66714 }];
      jest.spyOn(personAnnexService, 'query').mockReturnValue(of(new HttpResponse({ body: personAnnexCollection })));
      const expectedCollection: IPersonAnnex[] = [personAnnex, ...personAnnexCollection];
      jest.spyOn(personAnnexService, 'addPersonAnnexToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ person });
      comp.ngOnInit();

      expect(personAnnexService.query).toHaveBeenCalled();
      expect(personAnnexService.addPersonAnnexToCollectionIfMissing).toHaveBeenCalledWith(personAnnexCollection, personAnnex);
      expect(comp.personAnnexesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const person: IPerson = { id: 456 };
      const personAnnex: IPersonAnnex = { id: 29928 };
      person.personAnnex = personAnnex;

      activatedRoute.data = of({ person });
      comp.ngOnInit();

      expect(comp.personAnnexesCollection).toContain(personAnnex);
      expect(comp.person).toEqual(person);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerson>>();
      const person = { id: 123 };
      jest.spyOn(personFormService, 'getPerson').mockReturnValue(person);
      jest.spyOn(personService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ person });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: person }));
      saveSubject.complete();

      // THEN
      expect(personFormService.getPerson).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(personService.update).toHaveBeenCalledWith(expect.objectContaining(person));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerson>>();
      const person = { id: 123 };
      jest.spyOn(personFormService, 'getPerson').mockReturnValue({ id: null });
      jest.spyOn(personService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ person: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: person }));
      saveSubject.complete();

      // THEN
      expect(personFormService.getPerson).toHaveBeenCalled();
      expect(personService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPerson>>();
      const person = { id: 123 };
      jest.spyOn(personService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ person });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(personService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePersonAnnex', () => {
      it('Should forward to personAnnexService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(personAnnexService, 'comparePersonAnnex');
        comp.comparePersonAnnex(entity, entity2);
        expect(personAnnexService.comparePersonAnnex).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
