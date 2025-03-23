import React from 'react';
import { User } from '../store/userSlice';
import { Link } from 'react-router-dom';
import './UserCard.css';

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            <Link to={`/users/${user.id}`}>View Details</Link>
            <Link to={`/edit-user/${user.id}`}>Edit</Link>
        </div>
    );
};

export default UserCard;