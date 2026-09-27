import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  @Input() site: any;
  @Output() projectSelected = new EventEmitter<any>();

  openProject(project: any): void {
    this.projectSelected.emit(project);
  }
}
