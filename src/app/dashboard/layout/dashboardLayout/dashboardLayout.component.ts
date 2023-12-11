import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboardLayout.component.html',
  styleUrls: ['./dashboardLayout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent { 

  private authService = inject( AuthService );
  public user = computed( () => this.authService.currentUser() );
  // get user() {
  //     console.log(this.authService.currentUser());
  //     return this.authService.currentUser();
  //   }

  
  constructor(){
    this.user();
  }

  onLogout() {
    this.authService.logout();
  }

  
}
