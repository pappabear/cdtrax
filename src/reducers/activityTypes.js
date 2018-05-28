export function activityTypesHasErrored(state = false, action) {
    switch (action.type) {
        case 'ACTIVITYTYPES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function activityTypesIsLoading(state = false, action) {
    switch (action.type) {
        case 'ACTIVITYTYPES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function activityTypes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'ACTIVITYTYPES_FETCH_DATA_SUCCESS':
              return action.activityTypes
  
          default:
              return state  
    }
  }
  