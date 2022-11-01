import React, { useEffect, useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import { withAuthenticator, Button, Heading, TextField, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Header from './components/Header';
Amplify.configure(awsExports);

const initialState = { name: '', description: '' };

function App({ signOut, user }) {
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
        <div>
            <Header userName={user.username} handleSigout={signOut} />
            <h2>Amplify Todos</h2>
            <TextField
                onChange={(event) => setInput('name', event.target.value)}
                value={formState.name}
                placeholder="Name"
            />
            <TextField
                onChange={(event) => setInput('description', event.target.value)}
                value={formState.description}
                placeholder="Description"
            />
            <Button s onClick={addTodo}>
                Create Todo
            </Button>
            {todos.map((todo, index) => (
                <div key={todo.id ? todo.id : index}>
                    <Text>{todo.name}</Text>
                    <Text>{todo.description}</Text>
                </div>
            ))}
        </div>
    );
}
export default withAuthenticator(App);
