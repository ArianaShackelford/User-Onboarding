import React from 'react';
import {withFormik, Form, Field} from 'formik';


const UserForm = () => {
    return(
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name'/>
                <Field type='email' name='email' placeholder='Email'/> 
                
            </Form>
        </div>
    )
}

const superUserForm = withFormik(UserForm)

export default superUserForm;

