import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent implements OnInit {


  contacts: any[] = [];

  constructor(private _ser: UrlService, private _router: Router) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this._ser.getContacts().subscribe(
      (data: any[]) => {
        this.contacts = data; // Store the contact messages in the array
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }


  updateStatus(id: number) {
    this._ser.updateContactStatus(id).subscribe(
      () => {
        alert('Contact status updated successfully!');
        this.getContacts(); 
      },
      (error) => {
        alert('Error updating contact status');
        console.error('Error updating contact status:', error); 
      }
    );
  }
}
