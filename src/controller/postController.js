const prisma = require("../helpers/prisma")
const { postSchema } = require("../helpers/schema")

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()

        return res.status(201).json({
            success: true,
            status: "Get data posts successfully",
            data: posts
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            status: "Failed to get data posts"
        })
    }
}

const createPosts = async (req, res) => {
    try {
        const parse = postSchema.safeParse(req.body)

        if (!parse.success) {
            const errorMessage = parse.error.issues.map(err => `${err.path} - ${err.message}`)

            return res.status(400).json({
                success: false,
                status: errorMessage,
                error: null
            })
        }

        const post = await prisma.post.create({
            data: {
                title: parse.data.title,
                author_name: parse.data.author_name,
                content: parse.data.content,
                published: parse.data.published
            }
        })

        return res.status(201).json({
            success: true,
            status: "Create data posts successfully",
            data: post
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            status: "Failed to create data posts"
        })
    }
}

module.exports = {
    getPosts,
    createPosts
}