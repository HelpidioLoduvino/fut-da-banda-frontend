import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Home,
  Menu,
  Bell,
  CircleUserRound,
  UserRoundPlus, UserRound, ShoppingCart, DollarSign, Info
} from 'lucide-angular';


const icons = {
  Home,
  Menu,
  UserRound,
  Bell,
  CircleUserRound,
  ShoppingCart,
  DollarSign,
  Info
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
