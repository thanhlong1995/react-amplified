import { Button } from '@aws-amplify/ui-react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
function Header({ userName, handleSigout }) {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('username')}>{userName}</h3>
            <div className={cx('content')}>
                <Button onClick={handleSigout}>Logout</Button>
            </div>
        </div>
    );
}

export default Header;
