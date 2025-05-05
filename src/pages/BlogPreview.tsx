import { X } from "lucide-react";

const BlogPreview = ({ editor, title, readingTime, tags, imagePreview, onClose }: any) => {
    if (!editor) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
                {/* Preview header with close button */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Blog Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Preview content */}
                <div className="p-6">
                    {/* Blog title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title || "Untitled Blog"}</h1>

                    {/* Reading time and date */}
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                        <span>{new Date().toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{readingTime} min read</span>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag: any) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Cover image */}
                    {imagePreview && (
                        <div className="mb-6">
                            <img
                                src={imagePreview}
                                alt="Blog cover"
                                className="w-full rounded-lg object-cover max-h-96"
                            />
                        </div>
                    )}

                    {/* Blog content */}
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                    />
                </div>

                {/* Footer actions */}
                <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Editor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPreview