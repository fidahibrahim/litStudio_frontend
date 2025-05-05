import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Clock, ChevronLeft, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IBlog } from '../interface/userInterface';
import handleError from '../helpers/errorHandler';
import { fetchBlogById } from '../service/api/user';

const BlogPage = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            if (!blogId) return;

            try {
                setLoading(true);
                const response = await fetchBlogById(blogId);
                if (response.data && response.data.data) {
                    setBlog(response.data.data);
                } else {
                    throw new Error('No blog data found');
                }
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetails();
    }, [blogId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12">
                    <div className="animate-pulse flex flex-col w-full max-w-3xl mx-auto">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-4 w-8 bg-gray-300 rounded"></div>
                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="flex gap-2 mb-4">
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                            <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-64 bg-gray-300 rounded mb-8"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
                    <div className="text-center bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
                        <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
                        <Link to="/myBlogs" className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                            <ChevronLeft size={16} />
                            <span>Back to My Blogs</span>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Function to format blog content for better display
    const formatBlogContent = () => {
        if (!blog.content) return '';

        // If the content is already HTML, just return it
        if (blog.content.includes('<p>') || blog.content.includes('<div>')) {
            return blog.content;
        }

        // Otherwise, split by newlines and wrap in paragraph tags
        const paragraphs = blog.content.split('\n').filter(p => p.trim() !== '');
        return paragraphs.map(p => `<p>${p}</p>`).join('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-grow">
                {/* Back navigation */}
                <div className="container mx-auto max-w-4xl px-4 py-4">
                    <Link to="/myBlogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        <ChevronLeft size={18} />
                        <span>Back to My Blogs</span>
                    </Link>
                </div>

                {/* Blog header card */}
                <div className="container mx-auto max-w-4xl px-4 mb-8">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Featured image */}
                        <div className="w-full h-72 md:h-96 relative">
                            <img
                                src={blog.image || '/placeholder-image.jpg'}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-image.jpg';
                                    target.onerror = null;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>

                        {/* Blog info */}
                        <div className="p-6 md:p-8">
                            {/* Title and meta */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                                {/* Author */}
                                {blog.userId && blog.userId.name && (
                                    <div className="flex items-center gap-1">
                                        <User size={16} className="text-gray-500" />
                                        <span>{blog.userId.name}</span>
                                    </div>
                                )}

                                {/* Date */}
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} className="text-gray-500" />
                                    <span>{blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Tag size={16} className="text-gray-500" />
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="container mx-auto max-w-3xl px-4 pb-12">
                            <div className="bg-gray-100 rounded-xl shadow-md p-6 md:p-8">
                                {/* Blog content */}
                                <article className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: formatBlogContent() }}
                                        className="break-words overflow-hidden"
                                    />
                                </article>

                                {/* Blog footer */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>Posted on {formatDate(blog.createdAt)}</span>
                                        </div>

                                        {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                <span>Updated on {formatDate(blog.updatedAt)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}

            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;