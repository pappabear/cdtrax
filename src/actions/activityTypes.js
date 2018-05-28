import request from 'superagent'

export function activityTypesHasErrored(bool) {
    return {
        type: 'ACTIVITYTYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function activityTypesIsLoading(bool) {
    return {
        type: 'ACTIVITYTYPES_IS_LOADING',
        isLoading: bool
    };
}

export function activityTypesFetchDataSuccess(activityTypes) {
    return {
        type: 'ACTIVITYTYPES_FETCH_DATA_SUCCESS',
        activityTypes
    }
}

export function getActivityTypes() {
	return (dispatch) => {
        dispatch(activityTypesIsLoading(true));

		request
            .get('http://localhost:3001/activity_types')
            .end((err, res) => {
                if (err) {
                    dispatch(activityTypesHasErrored(true));
                }
        
                const activityTypes = JSON.parse(res.text)

                dispatch(activityTypesIsLoading(false))
                dispatch(activityTypesFetchDataSuccess(activityTypes))
			})
	}
}



