export function assessmentAreasHasErrored(state = false, action) {
    switch (action.type) {
        case 'ASSESSMENTAREAS_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function assessmentAreasIsLoading(state = false, action) {
    switch (action.type) {
        case 'ASSESSMENTAREAS_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function assessmentAreas(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'ASSESSMENTAREAS_FETCH_DATA_SUCCESS':
              return action.assessmentAreas
  
          case 'ADD_ASSESSMENTAREA':
              return [...state, action.payload]
  
          case 'DELETE_ASSESSMENTAREA':
              return state
  
          case 'UPDATE_ASSESSMENTAREA':
              return state
  
          default:
              return state  
    }
  }
  