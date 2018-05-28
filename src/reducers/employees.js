export function employeesHasErrored(state = false, action) {
    switch (action.type) {
        case 'EMPLOYEES_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function employeesIsLoading(state = false, action) {
    switch (action.type) {
        case 'EMPLOYEES_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function employees(state = [], action) {
      switch (action.type) 
      {
      
          // the reducer is the only one allowed to change state.  
          // like a beuracrat.  so i change the state at the API in the action controller and just give the reducer the new state.
          // HACK ????
          case 'EMPLOYEES_FETCH_DATA_SUCCESS':
              return action.employees
  
          case 'ADD_EMPLOYEE':
              return [...state, action.payload]
  
          case 'DELETE_EMPLOYEE':
              return state
  
          case 'UPDATE_EMPLOYEE':
              return state
  
          default:
              return state  
    }
  }
  