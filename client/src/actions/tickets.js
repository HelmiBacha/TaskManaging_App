import * as api from '../api';

//Created Actions
//the only way to add async is with dispatch .. idk xd
export const getTicket = (id) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {  data } = await api.fetchTicket(id);
        console.log(data);
        dispatch({ type: 'FETCH_TICKET', payload: data });
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message);
    };
};

export const getTickets = (page) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const {  data } = await api.fetchTickets(page);
        console.log(data);
        dispatch({ type: 'FETCH_ALL', payload: data });
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error.message);
    };
};

export const createTicket = (ticket) => async (dispatch) => {
    try {
        dispatch({type: 'START_LOADING'})
        const { data } = await api.createTicket(ticket);
        
        dispatch({ type: 'CREATE', payload: data });
        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
    }
}

export const updateTicket = (id, ticket) => async (dispatch) => {
    try {
       const { data } = await api.updateTicket(id, ticket);
       dispatch({  type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const deleteTicket = (id) => async (dispatch) => {
    try {
        await api.deleteTicket(id);
        dispatch({type: 'DELETE' });
    } catch (error) {
        console.log(error);
    }
}

export const assignTicket = (id) => async (dispatch) => {
    try {
        const { data } = await api.assignTicket(id);
        dispatch({ type: 'ASSIGN', payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const getTicketsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchTicketsBySearch(searchQuery);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}