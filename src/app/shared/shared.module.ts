import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  LucideAngularModule,
  Home,
  Menu,
  Bell,
  CircleUserRound,
  UserRound, ShoppingCart, DollarSign, Info, LogOut, Users, LineChart, LoaderCircle, Trash, Pencil
} from 'lucide-angular';
import {AdminSidebarComponent} from "./components/admin-sidebar/admin-sidebar.component";
import {AdminNavbarComponent} from "./components/admin-navbar/admin-navbar.component";
import {ModalComponent} from "./components/modal/modal.component";

const icons = {
  Home,
  Menu,
  UserRound,
  Bell,
  CircleUserRound,
  ShoppingCart,
  DollarSign,
  Info,
  LogOut,
  Users,
  LineChart,
  LoaderCircle,
  Trash,
  Pencil
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    ModalComponent,
    LucideAngularModule.pick(icons)
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    LucideAngularModule
  ]
})
export class SharedModule { }
