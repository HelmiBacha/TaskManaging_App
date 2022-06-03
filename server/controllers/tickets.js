import express from 'express';
import mongoose from 'mongoose';

import Ticket from '../models/tickets.js';

const router = express.Router();

export const getTickets = async (req, res) => { 
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) -1) * LIMIT; //indexation mtaa kol page jdida
        const total = await Ticket.countDocuments({});

        const tickets = await Ticket.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
                
        res.status(200).json({data: tickets, currentPage: Number(page), numberOfpages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getTicketsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query

    try {
        const PSA_Number = new RegExp(searchQuery, 'i'); //i stands for ignore case
        const tickets = await Ticket.find({ $or: [ { PSA_Number }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: tickets });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTicket = async (req, res) => { 
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);
        
        res.status(200).json(ticket);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTicket = async (req, res) => {
    const { PSA_Number, Owner, RequestType, Description, Priority, Status, Due_Date, tags, selectedFile} = req.body;

    const newTicket = new Ticket({ PSA_Number, Owner, RequestType, Description, Priority, Status, Due_Date, tags, selectedFile })

    try {
        await newTicket.save();

        res.status(201).json(newTicket );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { PSA_Number, Owner, RequestType, Description, Priority, Status, Due_Date, tags, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

    const updatedTicket = { PSA_Number, Owner, RequestType, Description, Priority, Status, Due_Date, tags, selectedFile, _id: id };

    await Ticket.findByIdAndUpdate(id, updatedTicket, { new: true });

    res.json(updatedTicket);
}

export const deleteTicket = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

    await Ticket.findByIdAndRemove(id);

    res.json({ message: "Ticket deleted successfully." });
}

export const assignTicket = async (req, res) => {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ticket with id: ${id}`);

    const ticket = await Ticket.findById(id);
    if (ticket.Status === 'Open'){
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { Status: ticket.Status='Assigned'}, { new: true });
    res.json(updatedTicket);
} else {
    res.status(400).send('Ticket is already assigned or closed');
}

}


export default router;