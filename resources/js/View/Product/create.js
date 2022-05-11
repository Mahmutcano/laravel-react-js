import React, {useState, useEffect} from 'react';
import {inject, observer} from "mobx-react";
import AuthStore from "../../Store/AuthStore";
import Layout from "../../Components/front.layout";
import {Formik} from "formik";
import * as Yup from "yup";
import {Button, Form} from "react-bootstrap";
import CustomInput from '../../Components/Form/CustomInput';
import Select from 'react-select'
import axios from "axios";

function Create(props) {
    const [categories, setCategories] = useState([
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'}
    ]);

    useEffect(() => {
        axios.get(`/api/urunler/ekle`, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = () => {

    };
    return (
        <Layout>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card p-5">
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
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Select
                                                    placeholder={'Ürün Kategorisi Seçiniz'}
                                                    options={categories}/>
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Ürün Adı"
                                                    type="text"
                                                    value={values.name}
                                                    handleChange={handleChange('name')}
                                                />
                                                {errors.name && touched.name && <p>{errors.name}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Ürün Model Dodu"
                                                    type="text"
                                                    value={values.modelCode}
                                                    handleChange={handleChange('modelCode')}
                                                />
                                                {errors.modelCode && touched.modelCode && <p>{errors.modelCode}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Barkod"
                                                    type="text"
                                                    value={values.barcode}
                                                    handleChange={handleChange('barcode')}
                                                />
                                                {errors.barcode && touched.barcode && <p>{errors.barcode}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Marka"
                                                    type="text"
                                                    value={values.brand}
                                                    handleChange={handleChange('brand')}
                                                />
                                                {errors.brand && touched.brand && <p>{errors.brand}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Stok"
                                                    type="number"
                                                    value={values.stok}
                                                    handleChange={handleChange('stok')}
                                                />
                                                {errors.stok && touched.stok && <p>{errors.stok}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="KDV"
                                                    type="text"
                                                    value={values.taxPrice}
                                                    handleChange={handleChange('taxPrice')}
                                                />
                                                {errors.taxPrice && touched.taxPrice && <p>{errors.taxPrice}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Alış Fiyatı"
                                                    type="number"
                                                    value={values.buyingPrice}
                                                    handleChange={handleChange('buyingPrice')}
                                                />
                                                {errors.buyingPrice && touched.buyingPrice &&
                                                    <p>{errors.buyingPrice}</p>}
                                            </div>
                                            <div className="col-md-6">
                                                <CustomInput
                                                    title="Satış Fiyatı"
                                                    type="number"
                                                    value={values.sellingPrice}
                                                    handleChange={handleChange('sellingPrice')}
                                                />
                                                {errors.sellingPrice && touched.sellingPrice &&
                                                    <p>{errors.sellingPrice}</p>}
                                            </div>
                                            <div className="col-md-12">
                                                <CustomInput
                                                    title="Açıklama"
                                                    type="text"
                                                    value={values.text}
                                                    handleChange={handleChange('text')}
                                                />
                                                {errors.text && touched.text && <p>{errors.text}</p>}
                                            </div>
                                        </div>

                                        <Button disabled={!isValid || isSubmitting} onClick={handleSubmit}
                                                variant="primary" type="button">
                                            Ürünü Ekle
                                        </Button>
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default inject("AuthStore")(observer(Create));
