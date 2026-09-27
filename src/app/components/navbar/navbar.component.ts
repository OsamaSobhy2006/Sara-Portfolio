import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type Language = 'ar' | 'en';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() site: any;
  @Input() currentLanguage: Language = 'en';
  @Input() menuOpen = false;
  @Input() scrolled = false;

  @Output() languageToggle = new EventEmitter<void>();
  @Output() menuToggle = new EventEmitter<void>();
  @Output() closeMenuRequest = new EventEmitter<void>();

  toggleLanguage(): void {
    this.languageToggle.emit();
  }

  toggleMenu(): void {
    this.menuToggle.emit();
  }

  closeMenu(): void {
    this.closeMenuRequest.emit();
  }
}
