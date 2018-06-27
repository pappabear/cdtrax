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
            .get('http://localhost:3001/dashboard/get_service_hours_dashboard_data')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(dashboardHasErrored(true));
                }
        
                const dashboardData = JSON.parse(res.text)
                //console.log(dashboardData)
                //console.log(dashboardData[1][1].cra_hours)
            
                dispatch(dashboardIsLoading(false))
                dispatch(dashboardFetchDataSuccess(dashboardData))
			})
	}
}


