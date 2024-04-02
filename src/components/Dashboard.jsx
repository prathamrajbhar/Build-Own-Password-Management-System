import React, { useRef, useEffect, useState } from 'react';
import { database } from '../config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

// AddPasswordModal component
function AddPasswordModal({ password, onClose, onSave }) {
  const [name, setName] = useState(password ? password.name : '');
  const [username, setUsername] = useState(password ? password.username : '');
  const [passwordValue, setPasswordValue] = useState(password ? password.password : '');
  const PMRKey = sessionStorage.getItem('PMRKey');

  const handleSubmit = async e => {
    e.preventDefault();
    const newData = { name, username, password: passwordValue };
    if (password) {
      await onSave(password.id, newData);
    } else {
      await addDoc(collection(database, PMRKey), newData);
    }
    onClose();
  };

  const inputUsername = useRef(null);
  useEffect(() => {
    if (inputUsername.current) {
      inputUsername.current.focus();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg w-96">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
            <span class="material-symbols-outlined">
              close
            </span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-800">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm text-gray-800">Username</label>
            <input
              ref={inputUsername}
              type="text"
              id="username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}


function Dashboard() {
  const [passwordsList, setPasswordsList] = useState([]);
  const [PMRKey, setPMRKey] = useState(sessionStorage.getItem('PMRKey') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);

  useEffect(() => {
    getPasswords();
  }, [PMRKey]);

  const getPasswords = async () => {
    if (PMRKey) {
      try {
        const querySnapshot = await getDocs(collection(database, PMRKey));
        const passwords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPasswordsList(passwords);
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    }
  };

  const openModal = (password = null) => {
    setSelectedPassword(password);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPassword(null);
    setIsModalOpen(false);
  };

  const handleUpdatePassword = async (id, newData) => {
    try {
      await updateDoc(doc(database, `${PMRKey}/${id}`), newData);
      getPasswords();
      closeModal();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDeletePassword = async id => {
    try {
      await deleteDoc(doc(database, `${PMRKey}/${id}`));
      getPasswords();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleCopyPassword = password => {
    navigator.clipboard.writeText(password.password);
  };




  return (
    <div className="p-4 sm:ml-64">
      <div className="bg-gray-50 dark:bg-gray-900 h-screen p-4">
        <div className="container px-6 py-16 mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Password Manager</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">A simple and secure way to store your passwords.</p>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Passwords</h2>
              <button onClick={() => openModal()} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add Password
              </button>
            </div>
            <div className="mt-4">
              {passwordsList.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-400">No passwords found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Name</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Username</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Password</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passwordsList.map(password => (
                        <tr key={password.id} className="text-sm text-gray-600 dark:text-gray-300">
                          <td className="px-4 py-3">{password.name}</td>
                          <td className="px-4 py-3">{password.username}</td>
                          <td className="px-4 py-3">
                            <input type="password" value={password.password} className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg focus:outline-none" readOnly />
                          </td>
                          <td className="flex px-4 py-3">
                            <button onClick={() => openModal(password)} className="material-symbols-outlined text-blue-600 hover:text-blue-700 focus:outline-none focus:text-blue-700 ms-2">
                              edit
                            </button>
                            <button onClick={() => handleCopyPassword(password)} className="material-symbols-outlined text-green-600 hover:text-green-700 focus:outline-none focus:text-green-700 ms-2">
                              content_copy
                            </button>
                            <button onClick={() => handleDeletePassword(password.id)} className="material-symbols-outlined text-red-600 hover:text-red-700 focus:outline-none focus:text-red-700 ms-2">
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddPasswordModal password={selectedPassword} onClose={closeModal} onSave={handleUpdatePassword} />}
    </div>
  );
}

export default Dashboard;
