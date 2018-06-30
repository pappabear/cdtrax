export function organizationsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ORGANIZATIONS_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function organizationsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ORGANIZATIONS_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function organizations(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'ORGANIZATIONS_FETCH_DATA_SUCCESS':
              return action.organizations
  
          case 'ADD_ORGANIZATION':
              return [...state, action.payload]
  
          case 'DELETE_ORGANIZATION':
              return state
  
          case 'UPDATE_ORGANIZATION':
              return state
  
          default:
              return state  
    }
  }
  