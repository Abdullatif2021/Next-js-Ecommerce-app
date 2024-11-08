// app/admin/users/page.js
'use client';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for add-user modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    isAdmin: false,
  });
  const [userToDelete, setUserToDelete] = useState(null); // State to hold the user ID for deletion

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setUsers([...users, data]); // Add new user to the list
    setIsModalOpen(false); // Close modal
    setNewUser({ email: '', password: '', isAdmin: false }); // Reset form
  };

  const confirmDeleteUser = (id) => {
    setUserToDelete(id); // Set the user to delete
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  const deleteUser = async () => {
    await fetch(`/api/users?id=${userToDelete}`, { method: 'DELETE' });
    setUsers(users.filter((user) => user.id !== userToDelete));
    setIsDeleteModalOpen(false); // Close confirmation modal
    setUserToDelete(null); // Clear the user ID
  };

  return (
    <div>
      <h1 className='text-2xl text-black font-bold mb-4'>Users</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className='mb-4 float-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Add New User
      </button>

      <table className='min-w-full bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead>
          <tr>
            <th className='p-3 text-left text-black'>Email</th>
            <th className='p-3 text-left text-black'>Role</th>
            <th className='p-3 text-left text-black'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='p-3 text-[#5b5252]'>{user.email}</td>
              <td className='p-3 text-[#5b5252]'>
                {user.isAdmin ? 'Admin' : 'User'}
              </td>
              <td className='p-3 text-[#5b5252]'>
                <button
                  onClick={() => confirmDeleteUser(user.id)}
                  className='text-red-500 hover:text-red-600'>
                  <FaTrash size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new user */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl text-black font-bold mb-4'>Add New User</h2>
            <form onSubmit={addUser} className='space-y-4'>
              <div>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='isAdmin'
                  checked={newUser.isAdmin}
                  onChange={handleInputChange}
                  className='mr-2'
                />
                <label className='text-gray-700'>Set as Admin</label>
              </div>
              <div className='flex justify-end space-x-4'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Deleting a User */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center'>
            <h2 className='text-xl text-black font-bold mb-4'>
              Confirm Deletion
            </h2>
            <p className='text-gray-700 mb-6'>
              Are you sure you want to delete this user?
            </p>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
