import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ContactInfoFormService, ContactInfoFormGroup } from './contact-info-form.service';
import { IContactInfo } from '../contact-info.model';
import { ContactInfoService } from '../service/contact-info.service';
import { IPerson } from 'app/entities/person/person.model';
import { PersonService } from 'app/entities/person/service/person.service';
import { ContactType } from 'app/entities/enumerations/contact-type.model';

@Component({
  selector: 'jhi-contact-info-update',
  templateUrl: './contact-info-update.component.html',
})
export class ContactInfoUpdateComponent implements OnInit {
  isSaving = false;
  contactInfo: IContactInfo | null = null;
  contactTypeValues = Object.keys(ContactType);

  peopleSharedCollection: IPerson[] = [];

  editForm: ContactInfoFormGroup = this.contactInfoFormService.createContactInfoFormGroup();

  constructor(
    protected contactInfoService: ContactInfoService,
    protected contactInfoFormService: ContactInfoFormService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute
  ) {}

  comparePerson = (o1: IPerson | null, o2: IPerson | null): boolean => this.personService.comparePerson(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactInfo }) => {
      this.contactInfo = contactInfo;
      if (contactInfo) {
        this.updateForm(contactInfo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactInfo = this.contactInfoFormService.getContactInfo(this.editForm);
    if (contactInfo.id !== null) {
      this.subscribeToSaveResponse(this.contactInfoService.update(contactInfo));
    } else {
      this.subscribeToSaveResponse(this.contactInfoService.create(contactInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactInfo>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(contactInfo: IContactInfo): void {
    this.contactInfo = contactInfo;
    this.contactInfoFormService.resetForm(this.editForm, contactInfo);

    this.peopleSharedCollection = this.personService.addPersonToCollectionIfMissing<IPerson>(
      this.peopleSharedCollection,
      contactInfo.person
    );
  }

  protected loadRelationshipsOptions(): void {
    this.personService
      .query()
      .pipe(map((res: HttpResponse<IPerson[]>) => res.body ?? []))
      .pipe(map((people: IPerson[]) => this.personService.addPersonToCollectionIfMissing<IPerson>(people, this.contactInfo?.person)))
      .subscribe((people: IPerson[]) => (this.peopleSharedCollection = people));
  }
}
