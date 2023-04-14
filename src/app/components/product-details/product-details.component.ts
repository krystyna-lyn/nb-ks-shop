import { Subscription } from 'rxjs';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProducts;
  productSubscribtion: Subscription;

  basket: IProducts[];
  basketSubcription: Subscription;

  constructor(private ProductsService: ProductsService, private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.productSubscribtion = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });

    this.basketSubcription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => { });
  }

}
