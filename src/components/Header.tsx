import { Menu, PenTool, X } from 'lucide-react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { persistor, rootState } from '../redux/store';
import { toast } from 'sonner';
import { removeUserInfo } from '../redux/userSlice';
import { logout } from '../service/api/user';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const userInfo = useSelector((state: rootState) => state.user.userData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const handleLogout = async () => {
        const response = await logout()
        if (response?.status) {
            dispatch(removeUserInfo());
            persistor.purge()
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            setTimeout(() => {
                toast.success("Logout Successful!")
            }, 1500)
        }
    }

    const isActive = (path: any) => {
        return activePath === path;
    }

    return (
        <>
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <PenTool className="h-8 w-8 text-indigo-600" />
                                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">litStudio</span>
                            </div>
                            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                                <a
                                    href="/"
                                    className={`${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-indigo-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Home
                                </a>
                                <a
                                    href="/explore"
                                    className={`${isActive('/explore') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-indigo-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Explore
                                </a>
                                <a
                                    href="/myBlogs"
                                    className={`${isActive('/myBlogs') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-indigo-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    myBlogs
                                </a>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                            {userInfo ? (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to='/login'>
                                        <button className="bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to='/register'>
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu - Improved spacing and design */}
                {mobileMenuOpen && (
                    <div className="sm:hidden bg-white shadow-lg rounded-b-lg">
                        <div className="pt-2 pb-3 space-y-1 px-2">
                            <a
                                href="/"
                                className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/') ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-300'} text-base font-medium`}
                            >
                                Home
                            </a>
                            <a
                                href="/explore"
                                className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/explore') ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-300'} text-base font-medium`}
                            >
                                Explore
                            </a>
                            <a
                                href="/myBlogs"
                                className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/myBlogs') ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-indigo-300'} text-base font-medium`}
                            >
                                myBlogs
                            </a>
                            <div className="mt-4 space-y-2 px-3 pb-3">
                                {userInfo ? (
                                    <>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-center bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-50"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to='/login'>
                                            <button className="w-full text-center bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-50">
                                                Login
                                            </button>
                                        </Link>
                                        <Link to='/register'>
                                            <button className="w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-indigo-700">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Header