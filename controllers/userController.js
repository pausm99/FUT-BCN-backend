const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const SECRET_KEY = process.env.SECRET_KEY;

class UserController {

    static async register(req, res) {

        //Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name, role, position, age, bank_account } = req.body;

        try {
            const existingUser = await User.getUserByEmail(email);
            console.log('Duplicated user:', existingUser);
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash de password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            const userId = await User.createUser(email, hashedPassword, name, role, position, age, bank_account);

            // Respond with success
            res.status(201).json({ message: 'User registered successfully', userId });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async login(req, res) {

        // Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Fetch the user from the database
            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const { id, name, role, position, age, bank_account } = user;

            // Check if the password matches
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const userSimple = { id, email, name, role };
            

            // Generate acces token
            const token = jwt.sign({ userSimple }, SECRET_KEY, {
                expiresIn: '7d',
            });

            // Respond with token
            res.cookie('refreshToken', token, { 
                maxAge: 604800000,
                path: '/',
                secure: false,
                //secure: true, CANVIAR QUAN SIGUI HTTPS
            });
            res.status(200).header('Authorization', `Bearer ${token}`).json({ message: 'User logged successfully'});

        } catch (err) {
            console.log(err);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async logout(req, res) {
        res.clearCookie('refreshToken');
        res.send({ message: 'User logged out' });
    }

    static async getUserByEmail(req, res) {
        //Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.params.email;

        try {
            const user = await User.getUserByEmail(email);
            if (user) {
                return res.json({ isDuplicated: true });
            } 
            else {
                return res.json({ isDuplicated: false });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getUserById(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = req.params.id;

        try {
            const user = await User.getUserById(id);
            if (user) {
                return res.status(200).json(user)
            }
            else {
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = UserController;