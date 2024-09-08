import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Header.module.css';
import { Home, BarChart2, LogOut, LogIn, MessageCircle, Bell } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NotificationListView from './NotificationListView';

function Header() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <BarChart2 className={styles.logoIcon} />
        <span>10-K Analyzer</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/" className={styles.navLink}>
              <Home className={styles.navIcon} />
              <span>Home</span>
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/dashboard" className={styles.navLink}>
                  <BarChart2 className={styles.navIcon} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/ai-advisor" className={styles.navLink}>
                  <MessageCircle className={styles.navIcon} />
                  <span>AI Advisor</span>
                </Link>
              </li>
              <li>
                <button onClick={logout} className={styles.logoutButton}>
                  <LogOut className={styles.navIcon} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link to="/login" className={styles.navLink}>
                <LogIn className={styles.navIcon} />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.rightSection}>
        <button onClick={toggleNotifications} className={styles.notificationButton}>
          <Bell className={styles.navIcon} />
        </button>
        <ThemeToggle />
      </div>
      {showNotifications && <NotificationListView onClose={() => setShowNotifications(false)} />}
    </header>
  );
}

export default Header;