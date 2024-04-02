import React, { useState } from 'react'
import axios from 'axios'

function Login() {
    const [username, setUsername] = useState(sessionStorage.getItem('PMUsername') || '')
    const [password, setPassword] = useState(sessionStorage.getItem('PMPassword') || '')

    const url = 'https://password-manager-efaaf-default-rtdb.firebaseio.com/'
    const handelSubmit = (e) => {
        e.preventDefault()
        axios.get(`${url}/users.json`)
            .then((response) => {
                const users = response.data
                const user = Object.keys(users).map(key => {
                    return users[key]
                })
                const foundUser = user.find(user => user.username === username && user.password === password)
                if (foundUser) {
                    // sessionStorage.setItem('PMUsername', username)
                    // sessionStorage.setItem('PMPassword', password)
                    sessionStorage.setItem('PMRKey', foundUser.RKey)
                    window.location.href = '/'
                } else {
                    alert('Invalid username or password')
                }
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
                        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8 font-bold	">Login</h1>
                        <div className="mb-5">
                            <label for="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="text"
                                id="uname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                style={{ width: '18rem' }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                style={{ width: '18rem' }}
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

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full sm:w-auto dark:bg-gradient-to-br dark:from-purple-600 dark:to-blue-500 dark:hover:bg-gradient-to-bl dark:focus:ring-blue-800" onClick={handelSubmit}>Login</button>
                        <div className="mt-4">
                            <span className="block text-sm text-center text-gray-900 dark:text-gray-300">Don't have an account?</span>
                            <a href="/new-user" className="block text-sm text-center text-blue-500 dark:text-blue-400">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login