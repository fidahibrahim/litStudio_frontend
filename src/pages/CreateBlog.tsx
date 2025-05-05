import { useRef, useState } from 'react';
import { ArrowLeft, Upload, Save, Eye } from 'lucide-react';
import { useFormik } from 'formik';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import EditorMenuBar from './EditorMenuBar';
import BlogPreview from './BlogPreview';
import { BlogFormSchema } from '../validation/registerValidation';
import handleError from '../helpers/errorHandler';
import { addBlog } from '../service/api/user';
import { useSelector } from 'react-redux';
import { rootState } from '../redux/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [readingTime, setReadingTime] = useState(0);
    const [tagInput, setTagInput] = useState('');
    const [showPreview, setShowPreview] = useState(false);

    const userId = useSelector((state: rootState) => state.user.userData?._id);
    const dropRef = useRef(null);
    const navigate = useNavigate()

    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Color,
            Underline,
            CodeBlock,
            Blockquote,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            const text = editor.getHTML().replace(/<[^>]*>/g, ' ');
            const words = text.split(/\s+/).filter(word => word.length > 0);
            setWordCount(words.length);
            setReadingTime(Math.ceil(words.length / 200));
            formik.setFieldValue('content', editor.getHTML());
        }
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            image: '',
            tags: [] as string[]
        },
        validationSchema: BlogFormSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const formData = new FormData()
                formData.append('title', values.title)
                formData.append('content', values.content)
                formData.append('tags', JSON.stringify(values.tags))
                if (userId) {
                    formData.append('userId', userId);
                }
                if (imageFile) {
                    formData.append('image', imageFile);
                }
                const response = await addBlog(formData)
                if(response.status) {
                    toast.success('Blog posted successfully')
                    navigate('/myBlogs')
                }
            } catch (error) {
                handleError(error)
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const handleImageChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            formik.setFieldValue('image', file.name);
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formik.values.tags.includes(trimmedTag) && formik.values.tags.length < 5) {
            const newTags = [...formik.values.tags, trimmedTag];
            formik.setFieldValue('tags', newTags);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = formik.values.tags.filter(tag => tag !== tagToRemove);
        formik.setFieldValue('tags', newTags);
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            <span>Back to My Blogs</span>
                        </button>
                    </div>

                    {/* Page title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Create New Blog</h1>
                        <p className="text-gray-600 mt-2">Share your thoughts and ideas with the world</p>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="space-y-8">
                        {/* Blog title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter an engaging title for your blog"
                                className={`w-full px-4 py-3 rounded-lg border ${formik.touched.title && formik.errors.title
                                    ? 'border-red-500 ring-1 ring-red-500'
                                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                    } focus:border-transparent`}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags (up to 5) <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag and press Enter"
                                    className={`flex-grow px-4 py-2 rounded-l-lg border ${formik.touched.tags && formik.errors.tags
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                                        } focus:border-transparent`}
                                />
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formik.values.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600 focus:outline-none"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>
                            {formik.touched.tags && formik.errors.tags && (
                                <p className="mt-1 text-sm text-red-600">
                                    {typeof formik.errors.tags === 'string'
                                        ? formik.errors.tags
                                        : 'Please add at least one tag'}
                                </p>
                            )}
                        </div>

                        {/* Image upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cover Image <span className="text-red-500">*</span>
                            </label>
                            <div
                                ref={dropRef}
                                className={`mt-1 flex flex-col items-center justify-center border-2 border-dashed ${formik.touched.image && formik.errors.image
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-gray-300 bg-gray-50'
                                    } rounded-lg p-6 transition-colors`}
                            >
                                {imagePreview ? (
                                    <div className="relative w-full">
                                        <img
                                            src={imagePreview}
                                            alt="Blog cover preview"
                                            className="mx-auto max-h-64 rounded-lg object-cover shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                formik.setFieldValue('image', '');
                                            }}
                                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2 text-center">
                                        <Upload className={`mx-auto h-12 w-12 ${formik.touched.image && formik.errors.image
                                            ? 'text-red-400'
                                            : 'text-gray-400'
                                            }`} />
                                        <div className="text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Upload an image</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                )}
                            </div>
                            {formik.touched.image && formik.errors.image && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.image}</p>
                            )}
                        </div>

                        {/* Blog content editor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Content <span className="text-red-500">*</span>
                            </label>
                            <div className={`bg-white rounded-lg border ${formik.touched.content && formik.errors.content
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } overflow-hidden`}>
                                <EditorMenuBar editor={editor} />
                                <EditorContent
                                    editor={editor}
                                    className="prose tiptap max-w-none p-4 min-h-64 max-h-96 overflow-y-auto focus:outline-none"
                                />
                            </div>
                            {formik.touched.content && formik.errors.content && (
                                <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
                            )}
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>{wordCount} words</span>
                                <span>~{readingTime} min read</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={togglePreview}
                                className="flex items-center px-6 py-2 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
                            >
                                <Eye size={18} className="mr-2" />
                                Preview
                            </button>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} className="mr-2" />
                                            Publish Blog
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {showPreview && (
                    <BlogPreview
                        editor={editor}
                        title={formik.values.title}
                        readingTime={readingTime}
                        tags={formik.values.tags}
                        imagePreview={imagePreview}
                        onClose={togglePreview}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CreateBlog;