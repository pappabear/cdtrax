import request from 'superagent'

export function dashboardHasErrored(bool) {
    return {
        type: 'DASHBOARD_HAS_ERRORED',
        hasErrored: bool
    };
}

export function dashboardIsLoading(bool) {
    return {
        type: 'DASHBOARD_IS_LOADING',
        isLoading: bool
    };
}

export function dashboardFetchDataSuccess(dashboardData) {
    return {
        type: 'DASHBOARD_FETCH_DATA_SUCCESS',
        dashboardData
    }
}

export function getDashboardData() {
	return (dispatch) => {
        dispatch(dashboardIsLoading(true));

        var dashboardData = []
        var loanData = []
        var investmentData = []

		request
            .get('http://cdtrax-backend-api.herokuapp.com/dashboard/service_hours_analytics')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(dashboardHasErrored(true));
                }
        
                dashboardData = JSON.parse(res.text)

                request
                    .get('http://cdtrax-backend-api.herokuapp.com/dashboard/loan_analytics')
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            dispatch(dashboardHasErrored(true));
                        }
                
                        loanData = JSON.parse(res.text)
                        dashboardData = dashboardData.concat(loanData)

                        request
                        .get('http://cdtrax-backend-api.herokuapp.com/dashboard/investment_analytics')
                        .end((err, res) => {
                            if (err) {
                                console.log(err)
                                dispatch(dashboardHasErrored(true));
                            }
                    
                            investmentData = JSON.parse(res.text)
                            dashboardData = dashboardData.concat(investmentData)
                            
                            dispatch(dashboardIsLoading(false))
                            dispatch(dashboardFetchDataSuccess(dashboardData))
                        })
    
                    })
    
        })
	}
}


