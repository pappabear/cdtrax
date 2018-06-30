export function volunteersHasErrored(state = false, action) {
    switch (action.type) {
        case 'VOLUNTEERS_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function volunteersIsLoading(state = false, action) {
    switch (action.type) {
        case 'VOLUNTEERS_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function volunteers(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'VOLUNTEERS_FETCH_DATA_SUCCESS':
              return action.volunteers
  
          case 'ADD_VOLUNTEER':
              return [...state, action.payload]
  
          case 'DELETE_VOLUNTEER':
              return state
  
          case 'UPDATE_VOLUNTEER':
              return state
  
          default:
              return state  
    }
  }
  