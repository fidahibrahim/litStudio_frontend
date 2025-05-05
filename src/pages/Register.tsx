import { useState } from 'react';
import { Eye, EyeOff, UserPlus, PenTool } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { RegisterValidationSchema } from '../validation/registerValidation';
import { register } from '../service/api/user';
import { registerInterface } from '../interface/userInterface';
import { toast } from 'sonner';
import handleError from '../helpers/errorHandler';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const navigate = useNavigate()

    const handleSubmit = async (values: registerInterface) => {
        try {
            const response = await register(values)
            console.log(response)
            if (response?.data.status) {
                toast.success('Signed Up Successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        } catch (error) {
            handleError(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-4xl flex overflow-hidden rounded-xl shadow-xl">
                {/* Left side - Registration form */}
                <div className="w-full md:w-1/2 bg-white p-8">
                    <Link to='/'>
                        <div className="flex items-center space-x-2 mb-4">
                            <PenTool className="h-8 w-8 text-indigo-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">litStudio</span>
                        </div>
                    </Link>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
                        <p className="text-gray-500 mt-1">Join LitStudio to manage your literary content</p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
                                        Full name
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe"
                                    />
                                    <div className='h-3'>
                                        <ErrorMessage name="name" component="p" className="mt-2 text-sm text-red-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                                        Email address
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="your@gmail.com"
                                    />
                                    <div className='h-3'>
                                        <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
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
                                    <div className='h-3'>
                                        <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-600" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword ? "text" : "password"}
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
                                    <div className='h-3'>
                                        <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-600" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center justify-center space-x-2 font-medium disabled:bg-blue-400"
                                >
                                    <UserPlus size={18} />
                                    <span>{isSubmitting ? 'Creating...' : 'Create account'}</span>
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="hidden md:block md:w-1/2 bg-blue-600 relative">
                    {/* Using a placeholder image - in a real implementation, you would use an actual image */}
                    <img
                        src="/banner.jpg"
                        alt="Creative workspace"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-70"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <h3 className="text-2xl font-bold mb-2">Join our community</h3>
                        <p className="text-blue-100">Create, manage, and publish your literary work with ease.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;