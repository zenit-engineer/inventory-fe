import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.css']
})
export class FilterProjectComponent implements OnInit, OnDestroy{

  selectedCategory: string = '';
  categories:string[] = [];
  @Output() selectCategory: EventEmitter<string> = new EventEmitter<string>();
  subscriptions: Subscription[] = [];
  productSubscribtion: Subscription = new Subscription();

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.productSubscribtion = this.productService.getCategories().subscribe(
      response => this.categories = response
    );
    this.subscriptions.push(this.productSubscribtion)
  }

  onChangeCategory($event: any){
    this.selectCategory.emit($event.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
