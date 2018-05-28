export function serviceTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'SERVICETYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function serviceTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'SERVICETYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function serviceTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'SERVICETYPES_FETCH_DATA_SUCCESS':
              return action.serviceTypes
  
          case 'ADD_SERVICETYPE':
              return [...state, action.payload]
  
          case 'DELETE_SERVICETYPE':
              return state
  
          case 'UPDATE_SERVICETYPE':
              return state
  
          default:
              return state  
    }
  }
  