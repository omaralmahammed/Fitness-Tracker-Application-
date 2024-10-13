import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QusaiURLService {
  baseUrl = "https://localhost:7286/api/";

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.email.asObservable();

  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();

  constructor(private http: HttpClient) {
    // Check if there's a stored user ID and update the subjects accordingly
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.setLoggedInState(storedUserId);
    }
  }

  private setLoggedInState(userId: string): void {
    this.UserId.next(userId);
    this.isLoggedInSubject.next(true);
    localStorage.setItem('userId', userId);
  }

  logout(): void {
    this.UserId.next("");
    this.email.next("");
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('userId');
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}User/LOGIN`, data)
      .pipe(
        tap(response => {
          if (response && response.id) {
            this.setLoggedInState(response.id.toString());
            this.email.next(response.email);
          }
        })
      );
  }

  GetProfileById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Profile/${id}`);
  }

  UpdateProfile(id: number, profileData: { firstName: string; lastName: string; email: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}Profile/${id}`, profileData);
  }

  // Add other methods as needed...
}
