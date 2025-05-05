import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IBlog } from '../interface/userInterface';
import handleError from '../helpers/errorHandler';
import { useSelector } from 'react-redux';
import { rootState } from '../redux/store';
import { deleteBlog, fetchUserBlogs } from '../service/api/user';
import { toast } from 'sonner';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const userId = useSelector((state: rootState) => state.user.userData?._id);

    useEffect(() => {
        if (!userId) {
            console.log('No userId available');
            return;
        }
        const fetchBlogs = async () => {
            try {
                const response = await fetchUserBlogs(userId);
                console.log(response, 'response in mYblogs pages');
                if (response.data && response.data.data) {
                    const sortedBlogs = [...response.data.data].sort((a, b) => {
                        // Handle optional createdAt field
                        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                        return dateB - dateA;
                    });
                    setBlogs(sortedBlogs);
                }
            } catch (error) {
                handleError(error);
            }
        };
        fetchBlogs();
    }, [userId]);

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteBlog(id);
            if (response.status === 200) {
                setBlogs(blogs.filter(blog => blog._id !== id));
                toast.success("Blog deleted successfully");
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            handleError(error);
        }
    };

    const createExcerpt = (content: string, length: number = 100) => {
        const plainText = content.replace(/<[^>]+>/g, '');
        return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12">
                {/* Page title - centered and styled */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 inline-block relative">
                        My Blogs
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 rounded-full mt-2"></div>
                    </h1>
                </div>

                {blogs.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-lg mx-auto border border-gray-100">
                        <div className="max-w-md mx-auto">
                            <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                <Plus size={38} className="text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Your First Blog</h2>
                            <p className="text-gray-600 mb-8">
                                You haven't created any blogs yet. Start sharing your thoughts and ideas with the world!
                            </p>
                            <Link to='/createBlog'>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                                    Create
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Create Blog button when blogs exist */}
                        <div className="flex justify-end mb-8">
                            <Link to='/createBlog'>
                                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors shadow-md">
                                    <Plus size={20} />
                                    <span>Create New Blog</span>
                                </button>
                            </Link>
                        </div>

                        {/* Blog grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map(blog => (
                                <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <Link to={`/blog/${blog._id}`} className="block">
                                        <img
                                            src={blog.image as string || '/placeholder-image.jpg'}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-image.jpg';
                                                target.onerror = null;
                                            }}
                                        />
                                    </Link>
                                    <div className="p-6">
                                        <Link to={`/blog/${blog._id}`} className="block">
                                            <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">{blog.title}</h2>
                                        </Link>
                                        <p className="text-gray-600 mb-4">{createExcerpt(blog.content)}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown date'}
                                            </span>
                                            <div className="flex gap-2">
                                                <Link to={`/editBlog/${blog._id}`}>
                                                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                                        <Pencil size={18} className="text-gray-600" />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                    onClick={() => blog._id && handleDelete(blog._id)}
                                                >
                                                    <Trash size={18} className="text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyBlogs;