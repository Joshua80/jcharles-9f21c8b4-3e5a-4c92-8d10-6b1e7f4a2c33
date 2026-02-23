import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Status Overview</h3>
      
      <!-- Progress Bar -->
      <div class="space-y-4">
        <!-- Completed -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ completedTasks }} ({{ completionRate }}%)</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
              [style.width.%]="completionRate"
            ></div>
          </div>
        </div>

        <!-- In Progress -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ inProgressTasks }} ({{ inProgressRate }}%)</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              [style.width.%]="inProgressRate"
            ></div>
          </div>
        </div>

        <!-- TODO -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">To Do</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ todoTasks }} ({{ todoRate }}%)</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
              [style.width.%]="todoRate"
            ></div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="inline-block w-3 h-3 rounded-full bg-green-500 mb-1"></div>
            <p class="text-xs text-gray-600 dark:text-gray-400">Done</p>
          </div>
          <div>
            <div class="inline-block w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
            <p class="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
          </div>
          <div>
            <div class="inline-block w-3 h-3 rounded-full bg-yellow-500 mb-1"></div>
            <p class="text-xs text-gray-600 dark:text-gray-400">To Do</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TaskChartComponent {
  @Input() totalTasks: number = 0;
  @Input() completedTasks: number = 0;
  @Input() inProgressTasks: number = 0;
  @Input() todoTasks: number = 0;

  get completionRate(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  get inProgressRate(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.inProgressTasks / this.totalTasks) * 100);
  }

  get todoRate(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.todoTasks / this.totalTasks) * 100);
  }
}
