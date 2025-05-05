const EditorMenuBar = ({ editor }: any) => {
    if (!editor) {
        return null;
    }

    const insertImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement; 
            if (target?.files?.length) {
                const file = target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target?.result && editor) {
                        editor.chain().focus().setImage({ src: event.target.result }).run();
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }
    const handleLinkUpdate = () => {
        const selection = editor?.state.selection;
        const previousUrl = selection ? editor.getAttributes('link').href : '';
        const url = window.prompt('URL', previousUrl);
        if (url === null) {
            return;
        }
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        const sanitizedUrl = url.trim().indexOf('://') > 0 ? url.trim() : `http://${url.trim()}`;

        editor?.chain().focus().extendMarkRange('link').setLink({ href: sanitizedUrl }).run();
    };

    return (
        <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
            {/* Text formatting */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                title="Bold"
            >
                <strong>B</strong>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                title="Italic"
            >
                <em>I</em>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
                title="Underline"
            >
                <u>U</u>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
                title="Strike"
            >
                <s>S</s>
            </button>

            <span className="border-l border-gray-300 mx-1"></span>

            {/* Headings */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
                title="Heading 1"
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                title="Heading 2"
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
                title="Heading 3"
            >
                H3
            </button>

            <span className="border-l border-gray-300 mx-1"></span>

            {/* Lists */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                title="Bullet List"
            >
                • List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                title="Numbered List"
            >
                1. List
            </button>

            <span className="border-l border-gray-300 mx-1"></span>

            {/* Alignment */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
                title="Align Left"
            >
                ←
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
                title="Align Center"
            >
                ↔
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
                title="Align Right"
            >
                →
            </button>

            <span className="border-l border-gray-300 mx-1"></span>

            {/* Link */}
            <button
                onClick={handleLinkUpdate}
                className={`p-1 rounded ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                title="Insert/Edit Link"
            >
                🔗
            </button>

            {/* Image */}
            <button
                onClick={insertImage}
                className="p-1 rounded"
                title="Insert Image"
            >
                🖼️
            </button>
        </div>
    );
};


export default EditorMenuBar