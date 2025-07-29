import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/Pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  products: WritableSignal<IProducts[]> = signal([]);
  original: WritableSignal<IProducts[]> = signal([]);
  value: string = '';
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products.set(res);
        this.original.set(this.products());
      },
    });
  }
  sortProducts(event: Event) {
    const element = event.target as HTMLSelectElement;
    const option = element?.value;
    this.products.update((products) => {
      const sorted = [...products];
      switch (option) {
        case 'lowToHigh':
          return sorted.sort((a, b) => a.price - b.price);
        case 'highToLow':
          return sorted.sort((a, b) => b.price - a.price);
        case 'a-z':
          return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'z-a':
          return sorted.sort((a, b) => b.title.localeCompare(a.title));
        case 'default':
        default:
          return [...this.original()];
      }
    });
  }
}
