const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const { userSchema } = require('../lib/zod');

function validateUserInput(data) {
    const parse = userSchema.safeParse(data);
    if (!parse.success) {
        const errorMessage = parse.error.issues.map(err => `${err.path} - ${err.message}`);
        return { success: false, errorMessage };
    }
    return { success: true };
}

function generateToken(user) {
    return jwt.sign({
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

async function isUserExist(email) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

async function createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return user;
}

async function deleteUser(id) {
    return await prisma.user.delete({
        where: { id: parseInt(id) }
    });
}

async function verifyPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = {
    validateUserInput,
    isUserExist,
    createUser,
    verifyPassword,
    generateToken,
    deleteUser
};
