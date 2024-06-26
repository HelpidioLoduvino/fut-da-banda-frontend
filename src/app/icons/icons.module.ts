import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Home,
  Menu,
  UsersRound,
  Bell,
  CircleUserRound,
  UserRoundPlus
} from 'lucide-angular';


const icons = {
  Home,
  Menu,
  UsersRound,
  Bell,
  CircleUserRound,
  UserRoundPlus
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
