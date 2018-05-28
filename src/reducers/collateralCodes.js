export function collateralCodesHasErrored(state = false, action) {
    switch (action.type) {
        case 'COLLATERALCODES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function collateralCodesIsLoading(state = false, action) {
    switch (action.type) {
        case 'COLLATERALCODES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function collateralCodes(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and 
          // just give the reducer the new state.
          // HACK ????
          case 'COLLATERALCODES_FETCH_DATA_SUCCESS':
              return action.collateralCodes
  
          case 'ADD_COLLATERALCODE':
              return [...state, action.payload]
  
          case 'DELETE_COLLATERALCODE':
              return state
  
          case 'UPDATE_COLLATERALCODE':
              return state
  
          default:
              return state  
    }
  }
  