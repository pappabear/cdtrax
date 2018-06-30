export function loansHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOANS_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function loansIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOANS_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function loans(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'LOANS_FETCH_DATA_SUCCESS':
              return action.loans
  
          case 'ADD_LOAN':
              return [...state, action.payload]
  
          case 'DELETE_LOAN':
              return state
  
          case 'UPDATE_LOAN':
              return state
  
          default:
              return state  
    }
  }
  