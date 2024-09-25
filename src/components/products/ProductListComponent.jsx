import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getProducts, DeleteProduct, GetProductById } from '../../services/ProductService';
import ProductForm from './ProductForm';

export default function ProductListComponent() {
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();
    //const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        const getProductos = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.log("There was an Error");
            }
        };
        getProductos();
    }, []);

    /*const editProduct = (id) => {
        navigate(`${id}`);
    };*/

    const selectProduct = (product) =>{
        //setSelectedProduct(product);
        navigate(`${product.id}`);
        
    }

    function CustomToast({ closeToast, onYes, onCancel }) {
        return (
            <div className='mt-4'>
                <p>Are you sure you want to proceed?</p>
                <button className='btn btn-success' onClick={onYes} style={{ marginRight: '10px' }}>Yes</button>
                <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
            </div>
        );
    }

    const handleYes = async (id) => {
        try {
            console.log("Deleting Product with ID:", id);
            await DeleteProduct(id);  
            toast.success("Product Deleted Successfully!");
            setProducts(Products.filter(Product => Product.id !== id));
        } catch (error) {
            toast.error("Error deleting Product");
        } finally {
            toast.dismiss();
        }
    };

    const handleCancel = () => {
        console.log("Product clicked Cancel");
        toast.dismiss(); 
    };

    const showCustomToast = (id) => {
        toast(<CustomToast onYes={() => handleYes(id)} onCancel={handleCancel} />, {
            position: "top-center",
            autoClose: false, 
            closeOnClick: false,
            closeButton: false,
            draggable: true,
        });
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {Products.map((Product, index) => (
                        <tr key={index}>
                            <td>
                                <h6>{Product.name}</h6>
                                <div className="actions-container">
                                    <a
                                        onClick={() => selectProduct(Product)}
                                        className="mr-2">
                                        Edit
                                    </a>
                                    <a
                                        onClick={() => showCustomToast(Product.id)}
                                        className="mx-2 text-danger">
                                        Remove
                                    </a>
                                </div>
                            </td>
                            <td>{Product.category}</td>
                            <td>{Product.price}</td>
                            <td>{Product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
