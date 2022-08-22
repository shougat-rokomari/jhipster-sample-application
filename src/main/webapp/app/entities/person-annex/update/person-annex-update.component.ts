import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PersonAnnexFormService, PersonAnnexFormGroup } from './person-annex-form.service';
import { IPersonAnnex } from '../person-annex.model';
import { PersonAnnexService } from '../service/person-annex.service';

@Component({
  selector: 'jhi-person-annex-update',
  templateUrl: './person-annex-update.component.html',
})
export class PersonAnnexUpdateComponent implements OnInit {
  isSaving = false;
  personAnnex: IPersonAnnex | null = null;

  editForm: PersonAnnexFormGroup = this.personAnnexFormService.createPersonAnnexFormGroup();

  constructor(
    protected personAnnexService: PersonAnnexService,
    protected personAnnexFormService: PersonAnnexFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personAnnex }) => {
      this.personAnnex = personAnnex;
      if (personAnnex) {
        this.updateForm(personAnnex);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personAnnex = this.personAnnexFormService.getPersonAnnex(this.editForm);
    if (personAnnex.id !== null) {
      this.subscribeToSaveResponse(this.personAnnexService.update(personAnnex));
    } else {
      this.subscribeToSaveResponse(this.personAnnexService.create(personAnnex));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonAnnex>>): void {
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

  protected updateForm(personAnnex: IPersonAnnex): void {
    this.personAnnex = personAnnex;
    this.personAnnexFormService.resetForm(this.editForm, personAnnex);
  }
}
