import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Form () {
    return (
        <Form>
            <label>
                Name
                <Field name='name' type='text' placeholder='Enter your Name' />
                <ErrorMessage name='name' component='div' />
            </label>
            <label>
                Email
                <Field name='email' type='text' placeholder='Enter your Email' />
                <ErrorMessage name='email' component='div' />
            </label>
            <label>
                Password
                <Field name='password' type='text' placeholder='Input your Password' />
                <ErrorMessage name='password' component='div' />
            </label>
            <label>
                Terms of service
                <Field name='checkbox' type='checkbox' />
            </label>
            <button type='submit'>Submit</button>
        </Form>
    );
}