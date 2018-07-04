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

		request
            .get('http://localhost:3001/dashboard/service_hours_analytics')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(dashboardHasErrored(true));
                }
        
                const dashboardData = JSON.parse(res.text)
            
                dispatch(dashboardIsLoading(false))
                dispatch(dashboardFetchDataSuccess(dashboardData))
			})
	}
}


