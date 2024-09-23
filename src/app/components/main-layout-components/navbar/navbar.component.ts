import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { filter } from 'rxjs';
import { TranslationServiceService } from '../../services/translation-service.service';
import { TranslatePipe } from '../../pipe/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    CommonModule,
    MatBadgeModule,
    MatSidenavModule,
    CommonModule,
    FormsModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    TranslatePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [TranslationServiceService],
})
export class NavbarComponent {
  basicSettingsExpanded = false; // Toggle variable
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Polish', code: 'pl' },
  ];
  selectedLanguage: string = 'en';
  systemFunctions = ['Change Password', 'System log', 'Logout'];
  selectFunctions: string = '';
  breadCrumbs: Array<{ label: string; url: string }> = [];
  constructor(
    private route: Router,
    private actiavedroute: ActivatedRoute,
    private translationservice: TranslationServiceService
  ) {
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadCrumbs = this.createdBreadCrumbs(this.actiavedroute.root);
      });
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translationservice.getCurrentLanguage();
  }

  private createdBreadCrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs:  Array<{ label: string; url: string }> = []
  ): Array<{ label: string; url: string }>  {
    const children: ActivatedRoute[] = route.children;
    // If there are no more child routes, stop and return breadcrumbs
    if (children.length === 0) {
      return breadcrumbs;
    }
    // Iterate through the children routes to generate breadcrumbs
    for (const child of children) {
      const path = child.snapshot.url.map((segment) => segment.path).join('/');
      // If the routeURL is not empty, append it to the URL path and push to breadcrumbs
      if (path !== '') {
        url += `${path}`;
        // Get the breadcrumb label from route data or use the URL as a fallback
        const breadcrumbLabel =
          child.snapshot.routeConfig?.data?.['breadcrumb'] || url;
                  // Push breadcrumb object with label and URL
        breadcrumbs.push({ label: breadcrumbLabel, url: url });
      }
      return this.createdBreadCrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  selectLanguage(language: { name: string; code: string }) {
    this.selectedLanguage = language.code; // Store the selected language code
    this.translationservice.setLanguage(language.code); // Set the translation language
  }
  selectedFunctions(item: string) {
    this.selectFunctions = item;
  }

  // Method to toggle the submenu visibility
  toggleBasicSettings() {
    this.basicSettingsExpanded = !this.basicSettingsExpanded;
  }
}
