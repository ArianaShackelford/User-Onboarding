import React, {useState, useEffect}from 'react';
import * as Yup from 'yup';
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';


const UserForm = ({errors, touched, status, values, isSubmitting}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users =>[...users, status])
    },[status])
    return(
        <div className='user-form'>
            <Form>
                <Field type='text' name='name' placeholder='Name' />
                {touched.name && errors.name && (<p>{errors.name}</p>)}
                <Field type='email' name='email' placeholder='Email'/> 
                {touched.email && errors.email && (<p>{errors.email}</p>)}
                <Field type='text' name='password' placeholder='Password' />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
                <label>
                <Field type='checkbox' name='terms' checked={values.terms}/>
                Terms of Service
                </label>
                <button type='submit' disabled={isSubmitting}>Submit!</button>
            </Form>
            {users.map(user => (
                <div key={user.id}>
                    <h3>Name: {user.name}</h3>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    )
}

const superUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        };
    },
    validationSchema:Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        email: Yup.string().required('Email is required!').email('Email not valid'),
        password: Yup.string().required('Password is required!').min(8, 'Password must be 8 characters or longer'),
        terms: Yup.boolean().required('Must agree to Terms of Service!')
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {
        if(values.email === 'alreadytaken@atb.dev') {
            setErrors({email: 'That email is already taken'});
        }else{
            axios.post('https://reqres.in/api/users/', values)
        .then(response => {
            console.log(response);
            resetForm();
            setSubmitting(false);
            setStatus(response.data);
        })
        .catch(error => console.log(error));
        setSubmitting(false);
    };

}
})(UserForm);

export default superUserForm;

