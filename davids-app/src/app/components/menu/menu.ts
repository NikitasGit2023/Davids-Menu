import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';



type MenuKeys =
  | "breakfast" | "pizza"   | "sandwiches"   | "pastries"  | "desserts"   | "hot-drinks"
   | "tea" | "milkshakes"   | "cold-coffee"  | "fresh-juice"  | "smoothies";

interface Category {
  key: MenuKeys;
  name: string;
  image: string;
}

export interface MenuItem {

  name: string;
  price: number;
  imageUrl: string;
  description?: string,
  ingredients: string[],
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  imports: [CommonModule]
})

export class MenuComponent implements OnInit {

    ngOnInit(): void {
    this.loadMenuFromJson();
}

  activeCategory: MenuKeys | null = null;
  selectedItem: MenuItem | null = null;
  menuItems: Partial<Record<MenuKeys, MenuItem[]>> = {};

  @ViewChild('navContainer') navContainer!: ElementRef;

categories: Category[] = [
  { key: 'breakfast',     name: 'Завтрак',                image: '/images/breakfast.jpg' },
  { key: 'pizza',         name: 'Пицца',                  image: '/images/pizza.jpg' },
  { key: 'sandwiches',    name: 'Сэндвичи',               image: '/images/sandwich.jpg' },
  { key: 'pastries',      name: 'Выпечка',                image: '/images/pastries.jpg' },
  { key: 'desserts',      name: 'Десерты',                image: '/images/desserts.jpg' },
  { key: 'hot-drinks',    name: 'Кофе',                   image: '/images/coffe-tea.jpg' },
  { key: 'tea',           name: 'Чай',                    image: '/images/coffe-tea.jpg' },
  { key: 'milkshakes',    name: 'милкшейк',               image: '/images/milkshakes.jpg' },
  { key: 'cold-coffee',   name: 'Холодный кофе',          image: '/images/cold-coffee.jpg' },
  { key: 'fresh-juice',   name: 'Свежий сок и лимонад',   image: '/images/fresh-juice.jpg' },
  { key: 'smoothies',     name: 'Смузи напитки',          image: '/images/smoothies.jpg' },
];

  loadMenuFromJson() {
    fetch('/menu.json')
      .then(response => response.json())
      .then(data => {
        this.menuItems = data;
      });
  }

  openCategory(category: Category) {
    this.activeCategory = category.key;
  }

  goBack() {
    this.activeCategory = null;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    event.preventDefault();
    if (this.activeCategory) {
      this.activeCategory = null;
      return history.pushState(null, '');
    }
    history.pushState(null, '');
  }

  openItem(item: MenuItem) {
    this.selectedItem = item;
  }

  closeItem() {
    this.selectedItem = null;
  }

}
