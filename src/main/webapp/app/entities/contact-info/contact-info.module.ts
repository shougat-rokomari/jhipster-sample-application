import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ContactInfoComponent } from './list/contact-info.component';
import { ContactInfoDetailComponent } from './detail/contact-info-detail.component';
import { ContactInfoUpdateComponent } from './update/contact-info-update.component';
import { ContactInfoDeleteDialogComponent } from './delete/contact-info-delete-dialog.component';
import { ContactInfoRoutingModule } from './route/contact-info-routing.module';

@NgModule({
  imports: [SharedModule, ContactInfoRoutingModule],
  declarations: [ContactInfoComponent, ContactInfoDetailComponent, ContactInfoUpdateComponent, ContactInfoDeleteDialogComponent],
})
export class ContactInfoModule {}
