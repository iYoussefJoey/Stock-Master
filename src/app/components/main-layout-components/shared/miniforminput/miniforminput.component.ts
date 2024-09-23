import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-miniforminput',
  standalone: true,
  imports: [ MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,],
  templateUrl: './miniforminput.component.html',
  styleUrl: './miniforminput.component.scss'
})
export class MiniforminputComponent {
  public companyForm!: FormGroup;
  public control!: FormControl;
  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() placeholder!: string;
  @Input() type!: string;
  constructor(public controlContainer: ControlContainer) {}

  ngOnInit() {
    this.companyForm = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.companyForm.get(this.controlName);
    //casting the control to FormControl
  }

  getErrors(): string[] {
    if (this.control && this.control.dirty && this.control.invalid) {
      let errors = this.control?.errors;
      // console.log('Error titles:', errorTitles);
      if (errors) {
        return Object.keys(errors);
      }
    }
    return [];
  }

}
