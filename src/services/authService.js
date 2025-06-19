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

async function isUserExist(email) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    return existingUser;
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function createUser({ name, email, password }) {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return user;
}

async function verifyPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = {
    validateUserInput,
    isUserExist,
    createUser,
    verifyPassword
};
