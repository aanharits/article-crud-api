const { validateUserInput, 
        isUserExist, 
        createUser, 
        verifyPassword, 
        generateToken, 
        deleteUser 
    } = require('../services/authService');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const validation = validateUserInput(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                status: validation.errorMessage,
                error: null
            });
        }

        const existingUser = await isUserExist(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                status: 'Email Already Exists',
            });
        }

        const user = await createUser({ name, email, password });
        return res.status(201).json({
            success: true,
            status: 'User Created Successfully',
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 'Registration Failed',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await isUserExist(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                status: 'User Not Found',
            });
        }
        
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                status: 'Invalid Password',
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            status: 'Login Successful',
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 'Login Failed',
        });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUser(id);

        return res.status(200).json({
            success: true,
            status: "Delete Users successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: "Failed to delete"
        });
    }
};

module.exports = {
    register,
    login,
    deleteUsers
};
