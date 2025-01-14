import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  public iconSidebar: any;
  public menuItems: Menu[] | any;

  // For Horizontal Menu
  public margin: any = 0;
  public width: any = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;

  constructor(
    private router: Router,
    public navServices: NavService,
    public layout: LayoutService
  ) {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) {
              this.setNavActive(items);
              return true; // Agregar esta línea
            }
            if (!items.children) {
              return false;
            }
            return items.children.filter((subItems) => {
              // Agregar un retorno aquí
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
                return true; // Agregar esta línea
              }
              if (!subItems.children) {
                return false;
              }
              return subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                  return true; // Agregar esta línea
                }
                return false;
              });
            });
          });
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth - 500;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  // Active Nave state
  setNavActive(item: any) {
    this.menuItems.filter((menuItem: any) => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems: any) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item: any) {
    if (!item.active) {
      for (const a of this.menuItems) {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          continue;
        }
        for (const b of a.children) {
          if (a.children.includes(item)) {
            b.active = false;
          }
        }
      }
    }
    item.active = !item.active;
  }

  // For Horizontal Menu
  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3051) {
      this.margin = -3464;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }
}
