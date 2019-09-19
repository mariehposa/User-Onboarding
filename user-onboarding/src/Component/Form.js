import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const userApi = 'https://reqres.in/api/users';

const initialUserForm = {
    name: '',
    email: '',
    password: '',
}

export default function UserForm () {
    const [userList, setUserList] = useState([]);
    const [userForm, setuserForm] = useState('');

    useEffect(() => {
        axios.get(userApi)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    //For onSubmit
    const addUser = (formValues, actions) => {
        const userToSubmit = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        };
        
        axios.post(userApi, userToSubmit)
            .then(res => {
                const newlyCreatedUserFromServer = res.data;
                setUserList(userList.concat(newlyCreatedUserFromServer));
                actions.resetForm();
            });
    }

    return (
        <div>
            <NewUserForm />
        </div>
    );
}

const validation = yup.object().shape({
    name: yup.string().required('Please enter correct name!'),
    email: yup.string().required('Please enter valid email!'),
    password: yup.string().required('Please input correct password!'),
})

function NewUserForm() {
    return(
        <Formik
            validationSchema={validation}
            render={props => {
                return (
                    <Form>
                        <label>
                            Name
                            <Field name='name' type='text' placeholder='Enter your Name' />
                            <ErrorMessage name='name' component='div' />
                        </label>
                        <br/>
                        <label>
                            Email
                            <Field name='email' type='text' placeholder='Enter your Email' />
                            <ErrorMessage name='email' component='div' />
                        </label>
                        <br/>
                        <label>
                            Password
                            <Field name='password' type='text' placeholder='Input your Password' />
                            <ErrorMessage name='password' component='div' />
                        </label>
                        <br/>
                        <label>
                            Terms of service
                            <Field name='checkbox' type='checkbox' />
                        </label>
                        <button type='submit'>Submit</button>
                    </Form>
                )
            }}
        />
    );
}