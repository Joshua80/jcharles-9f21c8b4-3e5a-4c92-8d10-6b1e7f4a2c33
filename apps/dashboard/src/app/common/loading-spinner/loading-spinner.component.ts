import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (fullScreen) {
      <div class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p class="text-gray-700 dark:text-gray-300 font-medium">{{ message }}</p>
          </div>
        </div>
      </div>
    } @else {
      <div class="flex items-center justify-center p-8">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-3"></div>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ message }}</p>
        </div>
      </div>
    }
  `,
})
export class LoadingSpinnerComponent {
  @Input() message: string = 'Loading...';
  @Input() fullScreen: boolean = false;
}
