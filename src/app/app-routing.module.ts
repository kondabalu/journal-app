import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { JournalBodyComponent } from './journal-body/journal-body.component';

const routes: Routes = [{ path: '', component: LoginPageComponent },
{path: 'journal', component:JournalBodyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
