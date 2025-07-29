import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { IProducts } from '../../shared/interfaces/IProducts';
import { ProductsService } from '../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, Location, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, TitleCasePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  productDetails: WritableSignal<IProducts> = signal({} as IProducts);
  Id: WritableSignal<string> = signal('');
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.Id.set(res.get('id')!);
      },
    });
    this.getProductDetails();
  }
  getProductDetails() {
    this.productsService.getSingleProduct(this.Id()).subscribe({
      next: (res) => {
        this.productDetails.set(res);
      },
    });
  }
  goBack() {
    this.location.back();
  }
}
