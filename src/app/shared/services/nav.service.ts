import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  roles?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      headTitle1: 'General',
    },
    {
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'light-primary',
      active: true,
      path: '/dashboard/default',
      // roles: ['admin', 'user'],
    },
    {
      headTitle1: 'Applications',
      headTitle2: 'Ready To Use Apps.',
    },
    {
      title: 'Categories',
      path: '/categories',
      icon: 'email',
      type: 'link',
      badgeType: 'light-secondary',
      active: false,
      roles: ['admin', ],
    },
    {
      title: 'Equipment',
      path: '/equipment',
      icon: 'email',
      type: 'link',
      badgeType: 'light-secondary',
      active: false,
      roles: ['admin' ],
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'email',
      type: 'link',
      badgeType: 'light-secondary',
      active: false,
      roles: ['admin'],
    },
    {
      title: 'Audit',
      path: '/audit',
      icon: 'search',
      type: 'link',
      badgeType: 'light-secondary',
      active: false,
      roles: ['admin'],
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

  filterMenuItemsByRoles(roles: string[]): Menu[] {
    return this.MENUITEMS.filter((item) => {
      if (item.roles) {
        return item.roles.some((role) => roles.includes(role));
      }
      return true;
    });
  }
  
  updateMenuItemsByRoles(roles: string[]): void {
    const filteredMenu = this.filterMenuItemsByRoles(roles);
    this.items.next(filteredMenu);
  }
}
