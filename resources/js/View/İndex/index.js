import React from 'react';
import {inject, observer} from "mobx-react";
import Layout from "../../Components/front.layout";


function Index(props) {
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">İndex</div>
                            <div className="card-body">İnde Proje</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default inject("AuthStore")(observer(Index));

