import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailsComponent } from './pages/details/details.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'}, 
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'products',component:ProductsComponent,title:'Products'},
    {path:'products/:id',component:DetailsComponent,title:'Details'},
    {path:'about',component:AboutComponent,title:'About'},
    {path:'**',component:NotFoundComponent,title:'Not-Found'},
];
