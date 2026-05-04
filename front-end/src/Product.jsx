

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import axios from "axios"

const Product = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();

    }, []);

    const FetchApiData = async () => {
        try {

            const res = await axios.get("http://localhost:5000/api/product/all");
            console.log(res.data);
            setData(res.data);

        }

        catch (err) {
            console.log(err);

        }
    }
    return (
        <>
            <h1> This is Product Page </h1>
            {
                data.map((item, index) => {

                    return (
                        <>



                            <h4> ProductName :-  {item.ProductName}</h4>
                            <h4> ProductPrice :- {item.ProductPrice}</h4>
                            <h4> Productquantity :- {item.Productquantity}</h4>
                            <img src={item.ProductImage} />


                        </>
                    )
                })
            }
        </>
    )
}

export default Product;
