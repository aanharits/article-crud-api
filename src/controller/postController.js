const { validatePostInput, getAllPosts, createPost, updatePost, deletePost } = require('../services/postService');

const getPosts = async (req, res) => {
    try {
        const posts = await getAllPosts();

        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                status: "No posts found",
                data: null
            });
        }

        return res.status(201).json({
            success: true,
            status: "Get data posts successfully",
            data: posts
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            status: "Failed to get data posts"
        });
    }
};

const createPosts = async (req, res) => {
    try {
        const validation = validatePostInput(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                status: validation.errorMessage,
                error: null
            });
        }

        const post = await createPost(validation.data);
        return res.status(201).json({
            success: true,
            status: "Create data posts successfully",
            data: post
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: "Failed to create data posts"
        });
    }
};

const updatePosts = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = validatePostInput(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                status: validation.errorMessage,
                error: null
            });
        }

        const post = await updatePost(id, validation.data);
        return res.status(200).json({
            success: true,
            status: "Update data posts successfully",
            data: post
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: "Failed to update data posts"
        });
    }
};

const deletePosts = async (req, res) => {
    try {
        const { id } = req.params;

        await deletePost(id);

        return res.status(200).json({
            success: true,
            status: "Delete data posts successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: "Failed to delete data posts"
        });
    }
};

module.exports = {
    getPosts,
    createPosts,
    updatePosts,
    deletePosts
};
