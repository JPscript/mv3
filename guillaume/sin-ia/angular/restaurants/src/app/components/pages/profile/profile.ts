import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  private readonly authService = inject(AuthService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  errorMessage = '';

  readonly currentUser = this.authService.currentUser;

  ngOnInit(): void {
    this.authService.loadProfile().subscribe({
      error: () => {
        this.errorMessage = 'Failed to load profile.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
