
import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class ContactsService{
  private contacts : Contact[] = [];
  private contactsUpdated  = new Subject<Contact[]>();

  constructor(private http: HttpClient){

  }
  getContacts(){
    this.http.get<{message: string, contacts: any}>('http://localhost:3000/api/contacts')
    .pipe(map(contactData => {
      return contactData.contacts.map(contact =>{
        return {
          name: contact.name,
          contactNo: contact.contactNo,
          address: contact.address,
          id: contact._id,
        };
      });
    }))
    .subscribe((transformedContacts) =>{
      this.contacts = transformedContacts;
      this.contactsUpdated.next([...this.contacts]);
    });
  }

  getContactUpdateListener(){
    return this.contactsUpdated.asObservable();
  }

  getContact(id: string) {
    return this.http.get<{ _id: string; name: string; contactNo: number; address: string}>(
      'http://localhost:3000/api/contacts/' + id);
  }
  addContact(name: string, contactNo: number, address: string){
    const contact: Contact ={id:null, name: name, contactNo: contactNo, address: address};
    this.http.post<{message: string, contactId: string}>('http://localhost:3000/api/contacts',contact)
    .subscribe(responseData =>{
      const id = responseData.contactId;
      contact.id = id;
      this.contacts.push(contact);
      this.contactsUpdated.next([...this.contacts]);
    });

  }

  updateContact(id: string, name: string, contactNo: number, address: string){
    const contact: Contact = {id: id , name: name, contactNo: contactNo, address: address};
    this.http.put('http://localhost:3000/api/contacts/' + id, contact)
    .subscribe(response => {
      const updatedContacts = [...this.contacts];
      const oldContactIndex = updatedContacts.findIndex(p => p.id === contact.id);
      updatedContacts[oldContactIndex] = contact;
      this.contacts = updatedContacts;
      this.contactsUpdated.next([...this.contacts]);
    });
  }
  deleteContact(contactId: string){
    this.http.delete('http://localhost:3000/api/contacts/' + contactId)
    .subscribe(() => {
     const updatedContacts = this.contacts.filter(contact => contact.id != contactId);
     this.contacts = updatedContacts;
     this.contactsUpdated.next([...this.contacts]);

    });
  }
}
