export function servicesHasErrored(state = false, action) {
    switch (action.type) {
        case 'SERVICES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function servicesIsLoading(state = false, action) {
    switch (action.type) {
        case 'SERVICES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function services(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'SERVICES_FETCH_DATA_SUCCESS':
              return action.services
  
          case 'ADD_SERVICE':
              return [...state, action.payload]
  
          case 'DELETE_SERVICE':
              return state
  
          case 'UPDATE_SERVICE':
              return state
  
          default:
              return state  
    }
  }
  