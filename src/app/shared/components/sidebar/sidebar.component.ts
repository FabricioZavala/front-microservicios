import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';
import { AuthGatewayService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public iconSidebar: any;
  public menuItems: Menu[] | any;
  public margin: any = 0;
  public width: any = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;

  constructor(
    private router: Router,
    public navServices: NavService,
    public layout: LayoutService,
    private authService: AuthGatewayService
  ) {}

  ngOnInit() {
    const userRoles = this.authService.getCurrentUserRoles();

    this.navServices.updateMenuItemsByRoles(userRoles);

    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateActiveMenu(event.url, menuItems);
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

  private updateActiveMenu(url: string, menuItems: Menu[]) {
    menuItems.forEach((item) => {
      if (item.path === url) {
        this.setNavActive(item);
      }
      if (item.children) {
        item.children.forEach((subItem) => {
          if (subItem.path === url) {
            this.setNavActive(subItem);
          }
          if (subItem.children) {
            subItem.children.forEach((subSubItem) => {
              if (subSubItem.path === url) {
                this.setNavActive(subSubItem);
              }
            });
          }
        });
      }
    });
  }

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
  

  setNavActive(item: Menu) {
    this.menuItems.forEach((menuItem: Menu) => {
      menuItem.active = menuItem === item;
      if (menuItem.children) {
        menuItem.children.forEach((subItem) => {
          subItem.active = subItem === item;
        });
      }
    });
  }

  toggletNavActive(item: Menu) {
    item.active = !item.active;
  }
}
