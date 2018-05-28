export function investmentTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'INVESTMENTTYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function investmentTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'INVESTMENTTYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function investmentTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'INVESTMENTTYPES_FETCH_DATA_SUCCESS':
              return action.investmentTypes
  
          case 'ADD_INVESTMENTTYPE':
              return [...state, action.payload]
  
          case 'DELETE_INVESTMENTTYPE':
              return state
  
          case 'UPDATE_INVESTMENTTYPE':
              return state
  
          default:
              return state  
    }
  }
  