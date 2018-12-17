import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Contact } from "../contact.model";
import { ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy{
  // contacts = [
  //   {name: 'shad', contactNo: '01487523', address: 'shadur Mor'},
  //   {name: 'munir', contactNo: '0266366', address: 'kajla'},
  //   {name: 'linkon', contactNo: '56615', address: 'kajla'},
  // ];

  contacts: Contact[] = [];

  private contactsSub: Subscription;
  constructor(public contactsService: ContactsService) {

  }

  ngOnInit() {
    this.contactsService.getContacts();
    this.contactsSub = this.contactsService.getContactUpdateListener()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  onDelete(contactId: string) {
    this.contactsService.deleteContact(contactId);
  }
  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
