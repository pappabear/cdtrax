export function callCodesHasErrored(state = false, action) {
    switch (action.type) {
        case 'CALLCODES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function callCodesIsLoading(state = false, action) {
    switch (action.type) {
        case 'CALLCODES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function callCodes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'CALLCODES_FETCH_DATA_SUCCESS':
              return action.callCodes
  
          case 'ADD_CALLCODE':
              return [...state, action.payload]
  
          case 'DELETE_CALLCODE':
              return state
  
          case 'UPDATE_CALLCODE':
              return state
  
          default:
              return state  
    }
  }
  