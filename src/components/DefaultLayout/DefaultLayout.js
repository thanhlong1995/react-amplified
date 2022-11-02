import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../..//graphql/mutations';
import { listTodos } from '../../graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Header from '~/components/Header';
import awsExports from '../../aws-exports';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import AddItem from '~/components/MainContent/AddItem';
import ListItem from '~/components/MainContent/Items';

Amplify.configure(awsExports);

const initialState = { name: '', description: '' };

const cx = classNames.bind(styles);

function DefaultLayout({ signOut, user }) {
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos));
            const todos = todoData.data.listTodos.items;
            setTodos(todos);
        } catch (err) {
            console.log('error fetching todos');
        }
    }

    async function addTodo() {
        try {
            if (!formState.name || !formState.description) return;
            const todo = { ...formState };
            setTodos([...todos, todo]);
            setFormState(initialState);
            await API.graphql(graphqlOperation(createTodo, { input: todo }));
        } catch (err) {
            console.log('error creating todo:', err);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Header username={user.username} handleSigout={signOut} />
            <AddItem
                valueName={formState.name}
                valueDescription={formState.description}
                setInput={setInput}
                addTodo={addTodo}
            />
            <ListItem todos={todos} />
        </div>
    );
}

export default withAuthenticator(DefaultLayout);
