export function entitiesHasErrored(state = false, action) {
    switch (action.type) {
        case 'ENTITIES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function entitiesIsLoading(state = false, action) {
    switch (action.type) {
        case 'ENTITIES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function entities(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'ENTITIES_FETCH_DATA_SUCCESS':
              return action.entities
  
          case 'ADD_ENTITY':
              return [...state, action.payload]
  
          case 'DELETE_ENTITY':
              return state
  
          case 'UPDATE_ENTITY':
              return state
  
          default:
              return state  
    }
  }
  