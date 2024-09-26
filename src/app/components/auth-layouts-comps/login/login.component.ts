import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '../../pipe/translate.pipe';
import { TranslationServiceService } from '../../services/translation-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatMenuModule,
    CommonModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private toaster: ToasterService,
    private router: Router,
    private translate: TranslateService,
    private translationservice: TranslationServiceService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  email: string = '';
  hide = signal(true);
  password: string = '';
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Polish', code: 'pl' },
  ];
  rememberMe: boolean = false;
  selectedLanguage: string = 'en';
  ngOnInit(): void {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const remember = localStorage.getItem('rememberMe');

    if (remember === 'true' && savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  login() {
    if (this.email == '' || this.password == '') {
      this.toaster.errorSnackBar();
      alert(
        `Please fill all the fields correctly`
      );
      return false;
    } else if(this.email != '' && this.password != '' ){
    if(this.rememberMe)
    {
      this.toggleRememberMe()
    }
    this.toaster.loginSnackBar();
    this.router.navigate(['home']);
    return true
    }
    return true 
  }
  toggleRememberMe():void {
    if (this.rememberMe){
      localStorage.setItem('savedEmail', this.email);
        localStorage.setItem('savedPassword', this.password);
        localStorage.setItem('rememberMe', 'true'); 
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('rememberMe');
    }
  }
  selectLanguage(language: { name: string; code: string }) {
    this.selectedLanguage = language.code; // Store the selected language code
    this.translationservice.setLanguage(language.code); // Set the translation language
  }
}
