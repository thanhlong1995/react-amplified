import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';
import { Text, Button, CheckboxField } from '@aws-amplify/ui-react';
import { ThemeContext } from '~/components/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Item({ todo }) {
    const handleChange = useContext(ThemeContext);
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('content-title')}>
                    <span className={cx('text')}>{todo.name}</span>
                </div>
                <Text className={cx('text-description')}>
                    {todo.description}
                </Text>
            </div>
            <div className={cx('content-btn')}>
                <Button className={cx('btn-action', 'edit')}>Edit</Button>
                <CheckboxField
                    name="subscribe"
                    size="large"
                    className={cx('btn-checkbox')}
                    value={todo.id}
                    onClick={(e) => handleChange(e)}
                />
            </div>
        </div>
    );
}

export default Item;
