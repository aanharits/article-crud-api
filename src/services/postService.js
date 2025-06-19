const prisma = require("../lib/prisma");
const { postSchema } = require("../lib/zod");

function validatePostInput(data) {
    const parse = postSchema.safeParse(data);
    if (!parse.success) {
        const errorMessage = parse.error.issues.map(err => `${err.path} - ${err.message}`);
        return {
            success: false,
            errorMessage
        };
    }
    return {
        success: true,
        data: parse.data
    };
}

async function getAllPosts() {
    return await prisma.post.findMany();
}

async function createPost(data) {
    return await prisma.post.create({
        data: {
            title: data.title,
            author_name: data.author_name,
            content: data.content,
            published: data.published
        }
    });
}

async function updatePost(id, data) {
    return await prisma.post.update({
        where: { id: parseInt(id) },
        data: {
            title: data.title,
            author_name: data.author_name,
            content: data.content,
            published: data.published
        }
    });
}

async function deletePost(id) {
    return await prisma.post.delete({
        where: { id: parseInt(id) }
    });
}

module.exports = {
    validatePostInput,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
};
