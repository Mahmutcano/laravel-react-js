import React, {useState, useEffect} from 'react';
import {Form, Button} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {inject, observer} from "mobx-react";
import AuthStore from "../../Store/AuthStore";
import {Link} from "react-router-dom";

function Login(props) {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                return props.history.push('/');
            }
        }
    });

    const handleSubmit = (values) => {

        axios.post(`/api/auth/login`,{...values})
            .then((res) => {
                if(res.data.success){
                    const userData = {
                        id:res.data.id,
                        name:res.data.name,
                        email:res.data.email,
                        access_token:res.data.access_token
                    };
                    const appState = {
                        isLoggedIn:true,
                        user:userData
                    };
                    props.AuthStore.saveToken(appState);
                    //props.history.push('/');
                    window.location.reload();
                }
                else
                {
                    alert('Giriş Yapamadınız');
                }

            })
            .catch(error => {
                if(error.response){
                    let err = error.response.data;
                    if(err.errors){
                        setErrors(err.errors);
                    }
                    else
                    {
                        setError(error.response.data.message);
                    }
                    //alert(err.errors)
                }
                else if (error.request){
                    let err = error.request;
                    setError(err);
                }
                else
                {
                    setError(error.message);

                }
            });
    }
    let arr = [];
    if(errors.length > 0 ){
        Object.values(errors).forEach(value => {
            arr.push(value)
        });
    }
    return (
        <div className="container mt-lg-5 w-50">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>Giriş</h1>
                        </div>
                        <Form className="px-5 mt-lg-5 mb-3">
                            { arr.length != 0 &&  arr.map((item) => (<p>{item}</p>))}
                            { error != '' &&  (<p>{error}</p>)}
                            <Formik initialValues={{
                                email: '',
                                password: '',
                            }} onSubmit={handleSubmit}
                                    validationSchema={
                                        Yup.object().shape({
                                            email: Yup
                                                .string()
                                                .email('Email Formatı Hatalı')
                                                .required('Zorunlu Alan'),
                                            password: Yup
                                                .string()
                                                .required('Şifre Zorunludur.'),
                                        })
                                    }
                            >
                                {({
                                      values,
                                      handleChange,
                                      handleSubmit,
                                      handleBlur,
                                      errors,
                                      isValid,
                                      isSubmitting,
                                      touched
                                  }) => (
                                    <>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Mail Giriniz"
                                                          value={values.email}
                                                          onChange={handleChange('email')}/>
                                            {errors.email && touched.email && <p>{errors.email}</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Şifre</Form.Label>
                                            <Form.Control type="password" placeholder="Şifre"
                                                          value={values.password}
                                                          onChange={handleChange('password')}/>
                                            {errors.password && touched.password && <p>{errors.password}</p>}
                                        </Form.Group>

                                        <Button disabled={!isValid || isSubmitting} onClick={handleSubmit}
                                                variant="primary" type="button">
                                            Giriş Yap
                                        </Button>
                                    </>
                                )}
                            </Formik>
                        </Form>
                        <div className="card-footer text-end">
                            <Link className="text-decoration-none text-dark" to="/register">Kayıt Ol</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default inject("AuthStore")(observer(Login));
