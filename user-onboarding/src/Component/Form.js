import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const userApi = 'https://reqres.in/api/users';

const initialUserForm = {
    name: '',
    email: '',
    password: '',
    terms: false,
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

    //For onSubmit: to add new user from fields and add to current user
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
            <NewUserForm onSubmit={addUser} />

            {
                userList.length
                    ? userList.map(user => (
                        <div key = {user.id} > {user.name} email is {user.email} with password {user.password} </div>
                    ))
                    :   'Oops! No friends yet!' 
            }
        </div>
    );
}

const validate = (formValues) => {
    const errors = {};

    //checking if name is correct
    if (!formValues.name) {
        errors.name = 'Please enter a valid name!';
    } else if (formValues.name.length < 2) {
        errors.name = 'Oops! That is short!';
    }

    //checking if email is valid
    if (!formValues.email) {
        errors.email = 'Please enter a valid email!';
    } else if (formValues.email.length < 2) {
        errors.email = 'Oops! That is short!';
    }

    //checking if password is valid
    if (!formValues.password) {
        errors.password = 'Please enter a valid password!';
    }

    if (!formValues.terms){
        errors.terms = "Read and accept terms"
    }

    return errors;
}

//to check for letters and numbers
const validation = yup.object().shape({
    name: yup.string().required('Please enter correct name!'),
    email: yup.string().required('Please enter valid email!').email("Enter a valid email containing @"),
    password: yup.string().required('Please input correct password!'),
    terms: yup.boolean().required("kindly check the box")
})

function NewUserForm({onSubmit}) {
    return(
        <Formik
            validationSchema= {validation}
            initialValues={initialUserForm}
            validate= {validate}
            onSubmit={onSubmit}
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
                            <Field name='terms' type='checkbox' />
                            <ErrorMessage name='terms' component='div' />
                        </label>
                        <br/>
                        <button type='submit'>Submit</button>
                    </Form>
                )
            }}
        />
    );
}