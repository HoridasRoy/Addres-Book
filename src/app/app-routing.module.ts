import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent} from './contacts/contact-list/contact-list.component';
import { ContactCreateComponent} from './contacts/contact-create/contact-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {path: 'myContacts', component: ContactListComponent , canActivate: [AuthGuard]},
  {path: 'addContact', component: ContactCreateComponent, canActivate: [AuthGuard]},
  {path: 'edit/:contactId', component: ContactCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
