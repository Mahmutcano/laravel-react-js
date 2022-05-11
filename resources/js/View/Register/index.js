import React, {useState, useEffect} from 'react';
import {Form, Button} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {inject, observer} from "mobx-react";
import AuthStore from "../../Store/AuthStore";

function Register(props) {
    const [errors,setErrors] = useState([]);
    const [error,setError] = useState('');

    useEffect(() => {
        if(props.AuthStore.appState != null){
            if(props.AuthStore.appState.isLoggedIn){
                return props.location.assign('/login');
            }
        }
    });

    const handleSubmit = (values) => {

        axios.post(`/api/auth/register`,{...values})
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
                    props.location.assign('/');
                    //location.reload();
                    console.log(props.user);
                    alert('Kayıt Tamamlandı')
                }
                else
                {
                    alert('Giriş Yapamadınız');
                }

            })
            .catch(error => {
                if(error.response){
                    let err = error.response.data;
                    setErrors(err.errors);
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
    return (<div className="container mt-lg-5 w-50">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>Kayıt Ol</h1>
                        </div>
                        <Form className="px-5 mt-lg-5 mb-3">
                            <Formik initialValues={{
                                name: '', email: '', password: '', password_confirmation: ''
                            }} onSubmit={handleSubmit}
                                    validationSchema={Yup.object().shape({
                                        email: Yup
                                            .string()
                                            .email('Email Formatı Hatalı')
                                            .required('Zorunlu Alan'),
                                        name: Yup
                                            .string()
                                            .required('Ad ve Soyaad Zorunludur'),
                                        password: Yup
                                            .string()
                                            .required('Şifre Zorunludur.'),
                                        password_confirmation: Yup
                                            .string()
                                            .oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmedi')
                                    })}
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
                                  }) => (<>
                                        <Form.Group className="mb-3" controlId="formBasicName" name="name">
                                            <Form.Label>Ad ve Soyad</Form.Label>
                                            <Form.Control type="text" placeholder="Ad ve Soyad Giriniz"
                                                          onBlur={handleBlur}
                                                          value={values.name}
                                                          onChange={handleChange('name')}/>
                                            {errors.name && touched.name && <p>{errors.name}</p>}
                                        </Form.Group>

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

                                        <Form.Group className="mb-3">
                                            <Form.Label>Şifre Tekrar</Form.Label>
                                            <Form.Control type="password" placeholder="Şifre Tekrar"
                                                          value={values.password_confirmation}
                                                          onChange={handleChange('password_confirmation')}/>
                                            {errors.password_confirmation && touched.password_confirmation &&
                                                <p>{errors.password_confirmation}</p>}
                                        </Form.Group>
                                        <Button disabled={!isValid || isSubmitting} onClick={handleSubmit}
                                                variant="primary" type="button">
                                            Kayıt Ol
                                        </Button>
                                    </>)}
                            </Formik>
                        </Form>
                    </div>
                </div>
            </div>
        </div>);
}

export default inject("AuthStore")(observer(Register));
