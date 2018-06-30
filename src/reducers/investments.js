export function investmentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'INVESTMENTS_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function investmentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'INVESTMENTS_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function investments(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'INVESTMENTS_FETCH_DATA_SUCCESS':
              return action.investments
  
          case 'ADD_INVESTMENT':
              return [...state, action.payload]
  
          case 'DELETE_INVESTMENT':
              return state
  
          case 'UPDATE_INVESTMENT':
              return state
  
          default:
              return state  
    }
  }
  