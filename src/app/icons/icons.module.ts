import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Home,
  Menu,
  Bell,
  CircleUserRound,
  UserRoundPlus, UserRound
} from 'lucide-angular';


const icons = {
  Home,
  Menu,
  UserRound,
  Bell,
  CircleUserRound,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
