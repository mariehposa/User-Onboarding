import React from 'react';


export default function Form () {
    return (
        <div>
            <label>
                Name
                <Field name='name' type='text' placeholder='Enter your Name' />
            </label>
            <label>
                Email
                <Field name='email' type='text' placeholder='Enter your Email' />
            </label>
            <label>
                Password
                <Field name='password' type='text' placeholder='Input your Password' />
            </label>
            <label>
                Terms of service
                <Field name='checkbox' type='checkbox' />
            </label>
        </div>
    );
}