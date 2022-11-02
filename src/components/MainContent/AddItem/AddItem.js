import classNames from 'classnames/bind';
import styles from './AddItem.module.scss';
import { TextField, Button } from '@aws-amplify/ui-react';

const cx = classNames.bind(styles);

function AddItem({ valueName, valueDescription, setInput, addTodo }) {
    return (
        <div className={cx('div-form')}>
            <div className={cx('div-input')}>
                <div className={cx('form-input')}>
                    <label className={cx('title')}>Name</label>
                    <input
                        className={cx('input')}
                        onChange={(event) =>
                            setInput('name', event.target.value)
                        }
                        value={valueName}
                        placeholder="Name"
                    />
                </div>
                <div className={cx('form-input')}>
                    <label className={cx('title')}>Description</label>
                    <input
                        className={cx('input')}
                        onChange={(event) =>
                            setInput('description', event.target.value)
                        }
                        value={valueDescription}
                        placeholder="Description"
                    />
                </div>
            </div>
            <div className={cx('div-btn')}>
                <Button onClick={addTodo} className={cx('btn-add')}>
                    Create Todo
                </Button>
            </div>
        </div>
    );
}

export default AddItem;
