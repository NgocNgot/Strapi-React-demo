import { useState } from "react";

const STRAPI_URL = "http://localhost:1337";

export default function CreateArticle({ onArticleCreated }: { onArticleCreated: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleCreateArticle = async () => {
        if (!title || !description) {
            alert("Title and Content are required!");
            return;
        }

        const newArticle = {
            data: {
                title,
                description,
                publishedAt: new Date().toISOString(),
                cover: { url: imageUrl },
            },
        };

        try {
        const response = await fetch(`${STRAPI_URL}/api/articles`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newArticle),
        });

        if (response.ok) {
            alert("Article created successfully!");
            setTitle("");
            setContent("");
            setImageUrl("");
            setIsOpen(false); // Đóng modal
            onArticleCreated(); // Cập nhật danh sách bài viết
        } else {
            alert("Failed to create article");
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };


    return (
        <>
        {/* Nút Create Article cố định ở góc dưới */}
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700"
        >
            Create Article
        </button>

        {/* Overlay + Form nếu isOpen = true */}
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create New Article</h2>
                <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                placeholder="Content"
                className="border p-2 w-full mb-2"
                rows={3}
                value={description}
                onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="border p-2 w-full mb-2"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <div className="flex justify-end">
                <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleCreateArticle}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Create
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
}
