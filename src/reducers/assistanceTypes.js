export function assistanceTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'ASSISTANCETYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function assistanceTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'ASSISTANCETYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function assistanceTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'ASSISTANCETYPES_FETCH_DATA_SUCCESS':
              return action.assistanceTypes
  
          case 'ADD_ASSISTANCETYPE':
              return [...state, action.payload]
  
          case 'DELETE_ASSISTANCETYPE':
              return state
  
          case 'UPDATE_ASSISTANCETYPE':
              return state
  
          default:
              return state  
    }
  }
  