import React from 'react';
import {Form} from "react-bootstrap";


const CustomInput = (props, {title, type, placeholder, value, handleChange}) => {
    console.log(props);
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{ title}</Form.Label>
            <Form.Control
                type={type}
                className="mb-3"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}/>
        </Form.Group>
    )
};

export default CustomInput;
