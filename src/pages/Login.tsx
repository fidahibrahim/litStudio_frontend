import { useState } from 'react';
import { Eye, EyeOff, LogIn, PenTool } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LoginValidationSchema } from '../validation/registerValidation';
import { loginInterface } from '../interface/userInterface';
import handleError from '../helpers/errorHandler';
import { login } from '../service/api/user';
import { setUserInfo } from '../redux/userSlice';
import { toast } from 'sonner';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: loginInterface) => {
        try {
            const response = await login(values)
            if (response.data.status) {
                toast.success("Successfully Logged into litStudio")
                if (response.data.data) {
                    dispatch(setUserInfo(response.data.data))
                    navigate('/')
                }
            }
        } catch (error) {
            handleError(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-4xl flex overflow-hidden rounded-xl shadow-xl">
                {/* Left side - Login form */}
                <div className="w-full md:w-1/2 bg-white p-8">
                    <Link to='/'>
                        <div className="flex items-center space-x-2 mb-8">
                            <PenTool className="h-8 w-8 text-indigo-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">litStudio</span>
                        </div>
                    </Link>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                        <p className="text-gray-500 mt-1">Please Sign In to your account</p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                                        Email address
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="your@gmail.com"
                                    />
                                    <div className="h-3 mt-1">
                                        <ErrorMessage name="email" component="p" className="text-sm text-red-600" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <Field
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="h-3 mt-1">
                                        <ErrorMessage name="password" component="p" className="text-sm text-red-600" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center space-x-2 font-medium"
                                >
                                    <LogIn size={18} />
                                    <span>{isSubmitting ? "Signing in..." : "Sign in"}</span>
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <a href="/register" className="font-medium text-blue-600 hover:text-blue-800">
                                Create an account
                            </a>
                        </p>
                    </div>

                    <div className="mt-8 text-center text-gray-400 text-xs">
                        <p>© 2025 LitStudio. All rights reserved.</p>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="hidden md:block md:w-1/2 bg-blue-600 relative">
                    {/* Using a placeholder image - in a real implementation, you would use an actual image */}
                    <img
                        src="/banner.jpg"
                        alt="Writers workspace"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-70"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">Manage your literary content</h3>
                        <p className="text-blue-100">The all-in-one platform for writers, editors, and content creators.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;