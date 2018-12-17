import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ContactsService } from "../contacts.service";
import { from } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Contact } from "../contact.model";

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  enteredName = '';
  enteredContactNo;
  enteredAddress = '';
  private mode = 'addContact';
  private contactId: string;
  contact: Contact;

  constructor(public contactsService: ContactsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if ( paramMap.has('contactId')) {
        this.mode = 'edit';
        this.contactId = paramMap.get('contactId');
        this.contactsService.getContact(this.contactId).subscribe(contactData => {
        this.contact = {id: contactData._id, name: contactData.name, contactNo: contactData.contactNo, address: contactData.address};
        });
      } else {
        this.mode = 'addContact';
        this.contactId = null;
      }
    });
  }
  onSaveContact(form: NgForm){
    if(form.invalid){
      return;
    }
    if ( this.mode === 'addContact'){
      this.contactsService.addContact(form.value.name,form.value.contactNo,form.value.address);
    } else {
      this.contactsService.updateContact(this.contactId,form.value.name,form.value.contactNo,form.value.address);
    }


    form.resetForm();
  }
}
