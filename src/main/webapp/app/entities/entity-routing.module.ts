import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'person',
        data: { pageTitle: 'jhipsterSampleApplicationApp.person.home.title' },
        loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'person-annex',
        data: { pageTitle: 'jhipsterSampleApplicationApp.personAnnex.home.title' },
        loadChildren: () => import('./person-annex/person-annex.module').then(m => m.PersonAnnexModule),
      },
      {
        path: 'contact-info',
        data: { pageTitle: 'jhipsterSampleApplicationApp.contactInfo.home.title' },
        loadChildren: () => import('./contact-info/contact-info.module').then(m => m.ContactInfoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
