export function activitiesHasErrored(state = false, action) {
    switch (action.type) {
        case 'ACTIVITIES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function activitiesIsLoading(state = false, action) {
    switch (action.type) {
        case 'ACTIVITIES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function activities(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'ACTIVITIES_FETCH_DATA_SUCCESS':
              return action.activities
  
          case 'ADD_ACTIVITY':
              return [...state, action.payload]
  
          case 'DELETE_ACTIVITY':
              return state
  
          case 'UPDATE_ACTIVITY':
              return state
  
          default:
              return state  
    }
  }
 