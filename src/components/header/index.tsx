import { useEffect, useState } from 'react';
import { useUserContext } from '@/contexts/useUserContext';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import Logo from '@components/logo/';
import NavList from '@components/nav-list';
import { logout } from '@/utils/api/commercetools-api';
import { siteNavItems, userNavItems } from './nav-items';
import cn from 'classnames';
import styles from './header.module.css';

type HeaderProps = {
  theme: 'light' | 'dark';
};

function Header({ theme }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);

  const { setApiRoot } = useApiRootContext();
  const { isUserLoggedIn, setIsUserLoggedIn } = useUserContext();

  useEffect(() => {
    function handleLinkClick(event: Event) {
      if (event.target as HTMLElement) {
        setOpen(false);
        document.body.classList.remove('lock');
      }
    }

    document
      .querySelector(`.${styles.header__navContainer}`)
      ?.addEventListener('click', handleLinkClick);

    return () => {
      document
        .querySelector(`.${styles.header__navContainer}`)
        ?.removeEventListener('click', handleLinkClick);
    };
  }, []);

  function handleMenuButton() {
    setOpen(!isOpen);
    document.body.classList.toggle('lock');
  }

  function logoutUser() {
    const response = logout();
    if (response.success && response.apiBuilder) {
      setApiRoot(response.apiBuilder);
      setIsUserLoggedIn(false);
    }
  }

  const currentUserNavItems = isUserLoggedIn
    ? [
        ...userNavItems.default,
        ...userNavItems.loggedIn.map((item) =>
          item.title === 'Logout' ? { ...item, clickHandler: logoutUser } : item,
        ),
      ]
    : [...userNavItems.default, ...userNavItems.notLoggedIn];

  return (
    <header className={cn(styles.header, styles[theme])}>
      <div className={`container ${styles.header__container}`}>
        <Logo theme={theme} />
        <nav className={cn(styles.header__nav, { [styles.active]: isOpen })}>
          <div className={styles.header__navContainer}>
            <NavList theme="dark" nav="site" items={siteNavItems} />
            <NavList theme="dark" nav="user" items={currentUserNavItems} />
          </div>
        </nav>
        <button
          className={cn(styles.header__menuButton, { [styles.open]: isOpen })}
          onClick={handleMenuButton}
        >
          <div className={styles.strip}></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
