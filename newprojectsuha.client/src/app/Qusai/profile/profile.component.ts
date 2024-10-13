import { Component, OnInit, OnDestroy } from '@angular/core';
import { QusaiURLService } from '../URL/qusai-url.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: any;
  editMode = false;
  profileForm: FormGroup;
  private subscription!: Subscription;

  constructor(
    private qusaiURLService: QusaiURLService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.subscription = this.qusaiURLService.UserIdObserve.subscribe(userId => {
      if (userId) {
        this.getProfile(userId);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getProfile(userId: string) {
    this.qusaiURLService.GetProfileById(1).subscribe(
      (data) => {
        this.profile = data;
        this.profileForm.patchValue(this.profile);
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.profileForm.patchValue(this.profile);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const userId = "1"; //this.qusaiURLService.UserId.getValue();
      if (userId) {
        this.qusaiURLService.UpdateProfile(parseInt(userId), this.profileForm.value).subscribe(
          () => {
            this.profile = { ...this.profile, ...this.profileForm.value };
            this.editMode = false;
          },
          (error) => {
            console.error('Error updating profile:', error);
          }
        );
      }
    }
  }
}
