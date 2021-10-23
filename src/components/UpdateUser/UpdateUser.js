import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);
    //update user
    const handleNameChange = e => {
        console.log(e.target.value);
        const UpdateName = e.target.value;
        const UpdateUser = { name: UpdateName, email: user.email };
        console.log(UpdateUser);
        setUser(UpdateUser);

    }
    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updateUser = { ...user };
        updateUser.email = updateEmail;
        console.log(updateUser);
        setUser(updateUser);
    }
    const handleUpdateUser = e => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated Successfully');
                    setUser({});
                }
                console.log(data);
            })

        e.preventDefault();
    };
    return (
        <div>
            <h2>update<b> {user.name} </b> </h2>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleNameChange} name="" id="" value={user.name || ''} />
                <input type="email" onChange={handleEmailChange} name="" id="" value={user.email || ''} />
                <input type="submit" name="" value="SUbmit" id="" />

            </form>
        </div >
    );
};

export default UpdateUser;