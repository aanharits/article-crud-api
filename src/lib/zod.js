const z = require('zod');

const postSchema = z.object({
    title: z.string(),
    author_name:z.string().optional(),
    content: z.string(),
    published: z.boolean().optional(),
})

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
    name: z.string(),
})

module.exports = {
    postSchema,
    userSchema
}