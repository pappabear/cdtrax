export function loanTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'LOANTYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function loanTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOANTYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function loanTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'LOANTYPES_FETCH_DATA_SUCCESS':
              return action.loanTypes
  
          case 'ADD_LOANTYPE':
              return [...state, action.payload]
  
          case 'DELETE_LOANTYPE':
              return state
  
          case 'UPDATE_LOANTYPE':
              return state
  
          default:
              return state  
    }
  }
  