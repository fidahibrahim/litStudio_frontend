import { useState, useEffect } from 'react';
import { Search, Calendar, ChevronRight } from 'lucide-react';
import { listBlogs } from '../service/api/user';
import handleError from '../helpers/errorHandler';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const stripHtml = (html) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    };

    const contentPreview = stripHtml(blog.content).length > 120
        ? `${stripHtml(blog.content).substring(0, 120)}...`
        : stripHtml(blog.content);

    // Format date to be more readable
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col h-full">
                    <div className="h-48 overflow-hidden">
                        {blog.image && blog.image.startsWith('http') ? (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{blog.title.charAt(0)}</span>
                            </div>
                        )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{blog.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{contentPreview}</p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                                    {blog.authorId.name.charAt(0)}
                                </div>
                                <span className="text-gray-700 font-medium">{blog.authorId.name}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{formatDate(blog.createdAt)}</span>
                                </div>
                                <Link to={`/blog/${blog._id}`} className="flex items-center text-indigo-600 hover:text-indigo-800">
                                    <span className="font-medium">Read more</span>
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Explore = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await listBlogs()

                setBlogs(response.data.data);
                setIsLoading(false);
            } catch (error) {
                handleError(error)
                setIsLoading(false);
                setBlogs([]);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof blog.content === 'string' && blog.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (blog.authorId && blog.authorId.name && blog.authorId.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (error) {
        return (

            <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-red-800 mb-2">Something went wrong</h3>
                    <p className="text-red-600">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Explore Blogs</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover interesting articles and stories from our community of writers
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search blogs by title, content, or author..."
                                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                            <p className="mt-4 text-gray-600 font-medium">Loading blogs...</p>
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            {filteredBlogs.length < blogs.length && (
                                <div className="text-center mt-8 text-gray-600">
                                    <p>Showing {filteredBlogs.length} of {blogs.length} blogs</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-lg mx-auto">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No blogs found</h3>
                            <p className="text-gray-600 mb-4">
                                We couldn't find any blogs matching your search criteria.
                            </p>
                            {searchTerm && (
                                <button
                                    className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear search and show all blogs
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Explore;