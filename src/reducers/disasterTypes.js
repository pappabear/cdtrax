export function disasterTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'DISASTERTYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function disasterTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'DISASTERTYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function disasterTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'DISASTERTYPES_FETCH_DATA_SUCCESS':
              return action.disasterTypes
  
          case 'ADD_DISASTERTYPE':
              return [...state, action.payload]
  
          case 'DELETE_DISASTERTYPE':
              return state
  
          case 'UPDATE_DISASTERTYPE':
              return state
  
          default:
              return state  
    }
  }
  