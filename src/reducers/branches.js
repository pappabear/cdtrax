export function branchesHasErrored(state = false, action) {
    switch (action.type) {
        case 'BRANCHES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function branchesIsLoading(state = false, action) {
    switch (action.type) {
        case 'BRANCHES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function branches(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'BRANCHES_FETCH_DATA_SUCCESS':
              return action.branches
  
          case 'ADD_BRANCH':
              return [...state, action.payload]
  
          case 'DELETE_BRANCH':
              return state
  
          case 'UPDATE_BRANCH':
              return state
  
          default:
              return state  
    }
  }
  