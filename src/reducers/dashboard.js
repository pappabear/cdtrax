export function dashboardHasErrored(state = false, action) {
    switch (action.type) {
        case 'DASHBOARD_HAS_ERRORED':
            return action.hasErrored
  
        default:
            return state
    }
  }
  
  export function dashboardIsLoading(state = false, action) {
    switch (action.type) {
        case 'DASHBOARD_IS_LOADING':
            return action.isLoading
  
        default:
            return state
    }
  }
  
  export function dashboardData(state = [], action) {

      switch (action.type) 
      {
      
          case 'DASHBOARD_FETCH_DATA_SUCCESS':
              return action.dashboardData
    
          default:
              return state  
    }
  }
  