import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:4040' });

export const fetchTickets = (page) => API.get(`/home?page=${page}`);
export const fetchTicket = (id) => API.get(`/home/${id}`);
export const fetchTicketsBySearch = (searchQuery) => API.get(`/home/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createTicket = (newTicket) => API.post('/home', newTicket);
export const updateTicket = (id, updatedTicket) => API.put(`${'/home'}/${id}`, updatedTicket);
export const deleteTicket = (id) => API.delete(`${'/home'}/${id}`);
export const assignTicket = (id) => API.put(`${'/home'}/${id}/assign`);