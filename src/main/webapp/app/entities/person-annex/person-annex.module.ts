import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PersonAnnexComponent } from './list/person-annex.component';
import { PersonAnnexDetailComponent } from './detail/person-annex-detail.component';
import { PersonAnnexUpdateComponent } from './update/person-annex-update.component';
import { PersonAnnexDeleteDialogComponent } from './delete/person-annex-delete-dialog.component';
import { PersonAnnexRoutingModule } from './route/person-annex-routing.module';

@NgModule({
  imports: [SharedModule, PersonAnnexRoutingModule],
  declarations: [PersonAnnexComponent, PersonAnnexDetailComponent, PersonAnnexUpdateComponent, PersonAnnexDeleteDialogComponent],
})
export class PersonAnnexModule {}
