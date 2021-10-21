import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, []);

    //delete an user
    const handleDeleteUSer = (id) => {
        const proceed = window.confirm('Do you wnat to proceed?');
        if (proceed) {
            console.log(id);
            const uri = `http://localhost:5000/users/${id}`;
            fetch(uri, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                })
        }
    }

    return (
        <div>
            <h2>Total users:{users.length}</h2>
            {
                users.map(user => <div key={user._id}>{user.name}::{user.email}
                    <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={() => handleDeleteUSer(user._id)}>X</button>
                </div>)
            }

        </div>
    );
};

export default Users;