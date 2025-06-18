const prisma = require('../helpers/prisma');
const bcrypt = require('bcrypt');
const { userSchema } = require("../helpers/schema")

const register = async (req, res) => {
    try {
        // Validasi input menggunakan Zod schema
        const parse = userSchema.safeParse(req.body)
        
        if (!parse.success) {
            const errorMessage = parse.error.issues.map(err => `${err.path} - ${err.message}`)
        
            return res.status(400).json({
                success: false,
                status: errorMessage,
                error: null
            })
        }
        
        // Cek apakah email sudah terdaftar
        const { email, password, name } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                status: 'Email sudah terdaftar',
            });
        }

        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return res.status(201).json({
            success: true,
            status: 'Registrasi berhasil',
            data: { id: user.id, email: user.email },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 'Gagal registrasi user',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                status: 'User tidak ditemukan',
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({
                success: false,
                status: 'Password salah',
            });
        }

        return res.status(200).json({
            success: true,
            status: 'Login berhasil',
            token,
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            status: 'Gagal login user',
        });
    }
};

module.exports = {
    register,
    login,
};
