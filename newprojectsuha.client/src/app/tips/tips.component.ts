import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
//export class TipsComponent {

//  TipsArray: any;
//  showModal: boolean = false; // Track modal visibility
//  modalTitle: string = ''; // Title for the modal
//  modalDescription: string = ''; // Description for the modal
//  constructor(private _ser: UrlService) { }

//  ngOnInit() {
//    this.getTips();
//  }

//  getTips() {
//    this._ser.getTips().subscribe((data: any) => {
//      this.TipsArray = data
//      console.log("Fetched services data:", this.TipsArray)
//    });
//  }
//  openModal(title: string, description: string) {
//    this.modalTitle = title; // Set modal title
//    this.modalDescription = description; // Set modal description
//    this.showModal = true; // Show the modal
//  }

//  closeModal() {
//    this.showModal = false; // Hide the modal
//  }
export class TipsComponent {
  TipsArray: any[] = []; // Array to hold health tips

  constructor(private _ser: UrlService) { }

  ngOnInit() {
    this.getTips(); // Fetch tips on initialization
  }

  getTips() {
    this._ser.getTips().subscribe((data: any) => {
      this.TipsArray = data.map((tip: any) => ({
        title: tip.title,
        image: tip.image, // Fallback image URL
        description: tip.description
      }));
      console.log("Fetched services data:", this.TipsArray); // Log the data for debugging
    });
  }
}


