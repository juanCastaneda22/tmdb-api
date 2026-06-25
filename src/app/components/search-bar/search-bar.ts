import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  query = signal('');
  
  constructor(private router: Router) {}

  onSearch() {
    const q = this.query().trim();
    if (q) {
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
