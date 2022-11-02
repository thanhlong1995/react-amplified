import { Button } from '@aws-amplify/ui-react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useContext } from 'react';

const cx = classNames.bind(styles);

function Header({ username, handleSigout }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('username')}>Hello {username}</h3>
            <h3 className={cx('username')}>Amplify Todos</h3>
            <div className={cx('content')}>
                <Button onClick={handleSigout} className={cx('btn-sigout')}>
                    Sigout
                </Button>
            </div>
        </div>
    );
}

export default Header;
