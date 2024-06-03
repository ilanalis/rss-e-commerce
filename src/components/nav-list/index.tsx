import styles from './nav-list.module.css';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type NavItem = {
  title: string,
  route?: string,
  icon?: string,
  clickHandler?: () => void
}

type NavListProps = {
  theme: 'light' | 'dark',
  nav: 'site' | 'user',
  items: NavItem[]
};

function NavList({ theme, nav, items }: NavListProps) {
  const navListClass = `${nav}Nav`;
  const navLinkClass = `${nav}Nav__link`;

  return (
    <ul className={cn(styles.navList, styles[navListClass], styles[theme])}>
      {items.map((item, i) => {
        return (
          <li key={item.title + i} className={styles.navItem}>
            {
              item.clickHandler
                ? <button
                  className={cn(styles.logoutButton, styles.userNav__link)}
                  onClick={item.clickHandler}
                >
                  <i className={cn(styles.icon, item.icon)}></i>
                  Logout
                </button>
                : item.route && <NavLink
                  className={({ isActive }) =>
                    cn(styles[navLinkClass], styles.navLink, { [styles.linkActive]: isActive })
                  }
                  to={item.route}
                >
                  {
                    item.icon &&
                    <i className={cn(styles.icon, item.icon)}></i>
                  }
                  {item.title}
                </NavLink>
            }
          </li>
        )
      })}
    </ul>
  );
}

export default NavList;
