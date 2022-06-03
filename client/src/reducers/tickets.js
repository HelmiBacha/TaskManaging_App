export default (state = { isLoading: true, tickets: []}, action) => {
    switch(action.type) {

        case 'START_LOADING':
            return { ...state,isLoading: true}
            
        case 'END_LOADING':
            return { ...state, isLoading: false}
        case 'FETCH_ALL':
            return {
                ...state,
                tickets: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case 'FETCH_BY_SEARCH':
            return { ...state, tickets: action.payload };
            
        case 'FETCH_TICKET':
            return { ...state, ticket: action.payload };
        case 'CREATE':
            return { ...state, tickets: [...state, action.payload ]};
        case 'UPDATE':
                return { ...state, tickets: state.tickets.map((ticket) => ticket._id === action.payload._id ? action.payload : ticket )};
        case 'DELETE':
            return { ...state, tickets: state.tickets.filter((ticket) => ticket._id !== action.payload)};
        case 'ASSIGN':
                return { ...state, tickets: state.tickets.map((ticket) => ticket._id === action.payload._id ? action.payload : ticket )};
         default:
             return state;
    };
};