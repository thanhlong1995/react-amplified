import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';
import { Text, Button, CheckboxField } from '@aws-amplify/ui-react';

const cx = classNames.bind(styles);
function Item({ todo }) {
    // Add/Remove checked item from list
    const handleCheck = (event) => {};

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('content-title')}>
                    <Text className={cx('text')}>{todo.name}</Text>
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
                    onClick={(event) => handleCheck(event)}
                />
            </div>
        </div>
    );
}

export default Item;
