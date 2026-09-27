import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() site: any;
  @Input() currentLanguage: 'ar' | 'en' = 'en';
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
