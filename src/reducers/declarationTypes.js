export function declarationTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'DECLARATIONTYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function declarationTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'DECLARATIONTYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function declarationTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'DECLARATIONTYPES_FETCH_DATA_SUCCESS':
              return action.declarationTypes
  
          case 'ADD_DECLARATIONTYPE':
              return [...state, action.payload]
  
          case 'DELETE_DECLARATIONTYPE':
              return state
  
          case 'UPDATE_DECLARATIONTYPE':
              return state
  
          default:
              return state  
    }
  }
  