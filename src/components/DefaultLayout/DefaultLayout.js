import React, { useEffect, useState, createContext } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo } from '../..//graphql/mutations';
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

export const ThemeContext = createContext();

function DefaultLayout({ signOut, user }) {
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);
    const [listValue, setListValue] = useState({
        valueID: [],
        currentListIDSelected: [],
    });
    const [countItem, setCountItem] = useState(0);

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

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { valueID } = listValue;
        // Case 1 : The user checks the box
        if (checked) {
            setListValue({
                valueID: [...valueID, value],
                currentListIDSelected: [...valueID, value],
            });
            setCountItem((prev) => prev + 1);
        }
        // Case 2  : The user unchecks the box
        else {
            setListValue({
                valueID: valueID.filter((e) => e !== value),
                currentListIDSelected: valueID.filter((e) => e !== value),
            });
            setCountItem((prev) => prev - 1);
        }
    };

    async function handleDelete() {
        try {
            listValue.currentListIDSelected.map(async (value) => {
                const todoDetails = {
                    id: value,
                };
                await API.graphql(
                    graphqlOperation(deleteTodo, { input: todoDetails }),
                );
            });
        } catch (err) {
            console.log('error creating todo:', err);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <ThemeContext.Provider value={handleChange}>
                <Header username={user.username} handleSigout={signOut} />
                <AddItem
                    valueName={formState.name}
                    valueDescription={formState.description}
                    setInput={setInput}
                    addTodo={addTodo}
                />
                <ListItem
                    todos={todos}
                    handleDelete={handleDelete}
                    countItem={countItem}
                />
            </ThemeContext.Provider>
        </div>
    );
}

export default withAuthenticator(DefaultLayout);
