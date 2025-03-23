import React, { useState, useEffect, } from 'react';
// import FormEvent from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { User, addUser, updateUser, deleteUser } from '../store/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const users = useSelector((state: RootState) => state.users.users);

  const editingUser = id ? users.find((user) => user.id === parseInt(id)) : null;

  const [name, setName] = useState(editingUser?.name || '');
  const [email, setEmail] = useState(editingUser?.email || '');
  const [street, setStreet] = useState(editingUser?.address?.street || '');
  const [suite, setSuite] = useState(editingUser?.address?.suite || '');
  const [city, setCity] = useState(editingUser?.address?.city || '');
  const [zipcode, setZipcode] = useState(editingUser?.address?.zipcode || '');

  const handleSubmit = (e:any) => { 
    e.preventDefault();
    const user: User = {
      id: editingUser?.id || Date.now(),
      name,
      email,
      address: { street, suite, city, zipcode },
    };

    if (editingUser) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
    navigate('/users');
  };

  const handleDelete = () => {
    if (editingUser) {
      dispatch(deleteUser(editingUser.id));
      navigate('/users');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      {editingUser && <button type="button" onClick={handleDelete}>Delete User</button>}
    </form>
  );
};

export default UserForm;