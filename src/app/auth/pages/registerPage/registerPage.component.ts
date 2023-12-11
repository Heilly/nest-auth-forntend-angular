import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'register-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './registerPage.component.html',
  styleUrls: ['./registerPage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent { }
