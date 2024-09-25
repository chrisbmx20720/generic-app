import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, DeleteUser } from '../../services/UserService';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function UserListComponent() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.log("There was an Error");
            }
        };
        getUsuarios();
    }, []);

    const editUser = (id) => {
        navigate(`edit-user/${id}`);
    };

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
            console.log("Deleting user with ID:", id);
            await DeleteUser(id);  // Usa el ID directamente
            toast.success("User Deleted Successfully!");
            setUsers(users.filter(user => user.id !== id)); // Actualiza la lista de usuarios
        } catch (error) {
            toast.error("Error deleting user");
        } finally {
            toast.dismiss();
        }
    };

    const handleCancel = () => {
        console.log("User clicked Cancel");
        toast.dismiss(); // Cierra el toast
    };

    const showCustomToast = (id) => {
        toast(<CustomToast onYes={() => handleYes(id)} onCancel={handleCancel} />, {
            position: "top-center",
            autoClose: false, // Eliminar el cierre automático para permitir la interacción
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>
                                <h6>{user.name + " " + user.lastname}</h6>
                                <div className="actions-container">
                                    <a
                                        onClick={() => editUser(user.id)}
                                        className="mr-2">
                                        Edit
                                    </a>
                                    <a
                                        onClick={() => showCustomToast(user.id)}
                                        className="mx-2 text-danger">
                                        Remove
                                    </a>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{"Administrator"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
