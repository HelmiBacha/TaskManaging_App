import User from '../models/User.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export const getUsers = async (req, res, next) => {
    
try {
    const user = await User.find({});
    res.status(200).json({user});
} catch (error) {
    next(error);
}
};

export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, firstName, username, email, password, role} = req.body;

    const newUser = new User({ name, firstName, username, email, password, role })

    try {
        await newTicket.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, firstName, username, email, role} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { name, firstName, username, email, role, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });

};