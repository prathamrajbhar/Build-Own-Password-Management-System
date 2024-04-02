import React from 'react'
import Hero from './Dashboard'
import { Link } from 'react-router-dom'

function Navbar() {
    const RKey = sessionStorage.getItem('PMRKey');
    const links = [
        {
            title: 'Dashboard',
            icon: 'dashboard',
            url: '/'
        },
    ]

    const LogOutHandeler = () => {
        sessionStorage.removeItem('PMRKey');
        window.location.reload();
    }

    const LogInHandeler = () => {
        window.location.href = '/login';
        window.location.reload();
    }

    return (
    <div className="p-6 sm:ml-64">
        <div className="fixed top-0 left-0 z-50 w-full bg-white shadow dark:bg-gray-800">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img src="https://flowbite.com/images/logo.svg" alt="Flowbite" className="w-10 h-10 rounded-full me-2" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Password Manager
                        </span>
                    </a>
                    <ul className="space-y-2 font-medium">
                        {links.map((link) => (
                            <li>
                                <Link to={link.url} className="flex items-center justify-between px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="flex items-center">
                                        <span class="material-symbols-outlined">
                                            {link.icon}
                                        </span>
                                        <span className="mx-4">{link.title}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                        {RKey === null ? (
                            <li>
                                <button onClick={LogInHandeler} className="flex items-center justify-between px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="flex items-center">
                                        <span class="material-symbols-outlined">
                                            login
                                        </span>
                                        <span className="mx-4">Login</span>
                                    </span>
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={LogOutHandeler} className="flex items-center justify-between px-4 py-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="flex items-center">
                                        <span class="material-symbols-outlined">
                                            logout
                                        </span>
                                        <span className="mx-4">Logout</span>
                                    </span>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </aside >
        </div >
    </div >
    )
}

export default Navbar