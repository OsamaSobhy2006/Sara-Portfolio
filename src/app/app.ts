import { Component } from '@angular/core';

import { PortfolioPageComponent } from './pages/portfolio-page/portfolio-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortfolioPageComponent],
  templateUrl: './app.html',
})
export class App {}
