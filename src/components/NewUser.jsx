import React, { useEffect, useState } from 'react'
import axios from 'axios'

function NewUser() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const url = 'https://password-manager-efaaf-default-rtdb.firebaseio.com/'
    const handelSubmit = (e) => {
        e.preventDefault()
        axios.post(`${url}/users.json`, {
            RKey: Math.random().toString(36).substring(7).toUpperCase(),
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response)
                sessionStorage.setItem('PMUsername', username)
                sessionStorage.setItem('PMPassword', password)
                window.location.href = '/login'
            })
            .catch((error) => {
                console.log(error)
            })
        setUsername('')
        setPassword('')
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="bg-gray-50 dark:bg-gray-900 h-screen">
                <div className="flex items-center justify-center h-full w-full">
                    <form className="max-w-sm mx-auto p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800" action="#" method="POST">
                        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8 font-bold	">New User</h1>
                        <div className="mb-5">
                            <label for="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="text"
                                id="uname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ width: '18rem' }}
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" style={{ width: '18rem' }}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handelSubmit}>Sign Up</button>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Already have an account? <a href="login" className="text-blue-600 hover:underline dark:text-blue-400">Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUser