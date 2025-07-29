import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { IProducts } from '../../shared/interfaces/IProducts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  products: WritableSignal<IProducts[]> = signal([]);
  ngOnInit(): void {
    this.getFeaturedProducts();
  }
  getFeaturedProducts() {
    this.productsService.getFeaturedProducts().subscribe({
      next: (res) => {
        this.products.set(res);
      },
    });
  }
}
