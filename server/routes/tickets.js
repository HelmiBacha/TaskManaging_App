import express from 'express';

import { getTickets, getTicket, createTicket, updateTicket, deleteTicket, assignTicket } from '../controllers/Tickets.js';

const router = express.Router();

router.get('/', getTickets);
router.post('/', createTicket);
router.get('/:id', getTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);
router.put('/:id/assign', assignTicket);

export default router;