import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import AuthStore from "../../Store/AuthStore";
import Layout from "../../Components/front.layout";
import axios from "axios";


function Index(props) {
    useEffect(() => {
        axios.get(`/api/product`,{
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch(error => console.log(error));
    },[]);
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Ürünler</div>
                            <button onClick={() => location.assign('/urunler/ekle')}>Yeni Ürün Ekle</button>
                            <div className="card-body">Ürünler</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default inject("AuthStore")(observer(Index));

