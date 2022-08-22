import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productSub!: Subscription;
  errorMessage: string = '';
  pageTitle: string = 'Product Detail';
  products: IProduct[] | undefined;
  product: IProduct | undefined;
  imageWidth: number = 200;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private productService: ProductService) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pageTitle += `: ${id}`;

    this.productSub = this.productService.getProducts().subscribe({
      next: products => {
          
        this.products = products;                

        if (this.products) {      
        
          this.products.forEach(product => {
            
            if (product.productId === id) {
              this.product = product;
            }
          });
        }
      },
      error: err => this.errorMessage = err
  });   
  }

  onBack(): void {

    this.router.navigate(['/products']);
  }

}
