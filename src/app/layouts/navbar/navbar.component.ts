import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
isDarkMode: boolean = false;
 isMobileMenuOpen:boolean = false;
platformId = inject(PLATFORM_ID);
renderer = inject(Renderer2);
  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
  
      const htmlElement = document.documentElement;
  
      if (this.isDarkMode) {
        this.renderer.addClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
    toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      if (this.isDarkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      }
    }
  }
}
