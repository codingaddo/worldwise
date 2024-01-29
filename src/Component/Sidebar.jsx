import React from 'react'
import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'

const Sidebar = () => {
  return (
    <div className={styles.Sidebar}>
        <Logo/>
        <AppNav/>
        <p>List of Cities</p>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
            </p>
        </footer>
    </div>
  )
}

export default Sidebar