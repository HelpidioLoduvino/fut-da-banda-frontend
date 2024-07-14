import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Home,
  Menu,
  Bell,
  CircleUserRound,
  UserRoundPlus, UserRound, ShoppingCart, DollarSign, Info, LogOut
} from 'lucide-angular';


const icons = {
  Home,
  Menu,
  UserRound,
  Bell,
  CircleUserRound,
  ShoppingCart,
  DollarSign,
  Info,
  LogOut
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
