import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Items.module.scss';
import Item from './Item';

const cx = classNames.bind(styles);

function ListItem({ todos, handleDelete, countItem }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('header-title')}>List Todo</span>
                <div className={cx('header-icon')} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span className={cx('count-item')}>
                        {countItem > 0 ? countItem : ''}
                    </span>
                </div>
            </div>
            <div className={cx('main-container')}>
                {todos.map((todo, index) => (
                    <div
                        key={todo.id ? todo.id : index}
                        className={cx('container-item')}
                    >
                        <Item todo={todo} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListItem;
