import { Component, OnDestroy, OnInit } from '@angular/core';
import {ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-visual-warehouse',
  standalone: true,
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressBarModule,CommonModule],
  templateUrl: './visual-warehouse.component.html',
  styleUrl: './visual-warehouse.component.scss'
})
export class VisualWarehouseComponent implements OnInit , OnDestroy {
  progressValue = 0;
  private intervalId: any;
  isCompleted:boolean = false;

  ngOnInit(): void {
    this.startProgressBar();
  }

  startProgressBar() {
    const duration = 7000; // 7 seconds
    const stepTime = 100; // update every 100ms
    const incrementValue = (100 / (duration / stepTime)); // value increment per step

    this.intervalId = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += incrementValue;
      } else {
        this.progressValue = 100; // ensure it stops at 100
        this.isCompleted = true;
        clearInterval(this.intervalId);
      }
    }, stepTime);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
