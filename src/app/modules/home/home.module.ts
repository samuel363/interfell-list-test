import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HomeComponent, ListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
