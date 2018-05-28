export function purposeCodesHasErrored(state = false, action) {
    switch (action.type) {
        case 'PURPOSECODES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function purposeCodesIsLoading(state = false, action) {
    switch (action.type) {
        case 'PURPOSECODES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function purposeCodes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'PURPOSECODES_FETCH_DATA_SUCCESS':
              return action.purposeCodes
  
          case 'ADD_PURPOSECODE':
              return [...state, action.payload]
  
          case 'DELETE_PURPOSECODE':
              return state
  
          case 'UPDATE_PURPOSECODE':
              return state
  
          default:
              return state  
    }
  }
  