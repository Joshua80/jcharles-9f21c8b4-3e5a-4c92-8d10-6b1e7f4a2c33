import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'dashboard';
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize theme service
    this.themeService.currentTheme();
  }
}
