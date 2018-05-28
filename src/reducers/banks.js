export function banksHasErrored(state = false, action) {
  switch (action.type) {
      case 'BANKS_HAS_ERRORED':
          return action.hasErrored

      default:
          return state
  }
}

export function banksIsLoading(state = false, action) {
  switch (action.type) {
      case 'BANKS_IS_LOADING':
          return action.isLoading

      default:
          return state
  }
}

export function banks(state = [], action) {
    switch (action.type) 
    {
    
        // the reducer is the only one allowed to change state.  
        // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
        // HACK ????
        case 'BANKS_FETCH_DATA_SUCCESS':
            return action.banks

        case 'ADD_BANK':
            return [...state, action.payload]

        case 'DELETE_BANK':
            return state

        case 'UPDATE_BANK':
            return state

        default:
            return state  
  }
}
