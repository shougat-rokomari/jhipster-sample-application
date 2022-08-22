import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonAnnex } from '../person-annex.model';

@Component({
  selector: 'jhi-person-annex-detail',
  templateUrl: './person-annex-detail.component.html',
})
export class PersonAnnexDetailComponent implements OnInit {
  personAnnex: IPersonAnnex | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personAnnex }) => {
      this.personAnnex = personAnnex;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
