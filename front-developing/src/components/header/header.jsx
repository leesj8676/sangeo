import React from 'react';
import styles from './header.module.css';
import { useState } from 'react';

const Header =({onLogout}) => {
    const [sign, setSign] = useState(true);

    const onClick = () => {
      setSign((prev) => !prev);
    };

    return (
    <div>
        <ul className={styles.navbar}>
            <li>{onLogout && (
                <button className={styles.logout} onClick={onLogout}>
                Logout
                </button>
             )}
            </li>

            <li>
                <button onClick={onClick}>로그인</button>
            </li>
             <li>
                <button onClick={onClick}>회원가입</button>
            </li>
    <img className={styles.logo} src="/images/logo.jpg" alt="logo"/>
    <h1 className={styles.title}> 상 어 </h1>
    </ul>
    </div>
    )
}

export default Header;