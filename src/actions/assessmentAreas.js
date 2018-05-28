import request from 'superagent'

export function assessmentAreasHasErrored(bool) {
    return {
        type: 'ASSESSMENTAREAS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function assessmentAreasIsLoading(bool) {
    return {
        type: 'ASSESSMENTAREAS_IS_LOADING',
        isLoading: bool
    };
}

export function addAssessmentArea(code, description, bankId) {
	return (dispatch) => {

        dispatch(assessmentAreasIsLoading(true))

		request
            .post('http://localhost:3001/assessment_areas')
            .send({code:code, description:description, bank_id:bankId})
            .end((err, res) => {
                if (err) {
                    console.log('addAssessmentAreaArea() API call failed')
                    console.log(err)
                    dispatch(assessmentAreasHasErrored(true))
                }
                //console.log('addArea() API call succeeded')
                dispatch(assessmentAreasIsLoading(false))
                dispatch(getAssessmentAreas())
			})
	}
}

export function deleteAssessmentArea(id) {
	return (dispatch) => {

        dispatch(assessmentAreasIsLoading(true))

        request
            .delete('http://localhost:3001/assessment_areas/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('deleteAssessmentArea() API call failed')
                    console.log(err)
                    dispatch(assessmentAreasHasErrored(true))
                }
                //console.log('deleteArea() API call succeeded')
                dispatch(assessmentAreasIsLoading(false))
                dispatch(getAssessmentAreas())
			})
	}
}

export function updateAssessmentArea(id, code, description, bankId) {
	return (dispatch) => {

        dispatch(assessmentAreasIsLoading(true))

        request
            .put('http://localhost:3001/assessment_areas/' + id)
            .send({id: id, code: code, description: description, bank_id:bankId })
            .end((err, res) => {
                if (err) {
                    console.log('updateAssessmentArea() API call failed')
                    console.log(err)
                    dispatch(assessmentAreasHasErrored(true))
                }
                //console.log('updateArea() API call succeeded')
                dispatch(assessmentAreasIsLoading(false))
                dispatch(getAssessmentAreas())
			})
	}
}



export function assessmentAreasFetchDataSuccess(assessmentAreas) {
    return {
        type: 'ASSESSMENTAREAS_FETCH_DATA_SUCCESS',
        assessmentAreas
    }
}


export function getAssessmentAreas() {
	return (dispatch) => {

        dispatch(assessmentAreasIsLoading(true));

		request
            .get('http://localhost:3001/assessment_areas')
            .end((err, res) => {
                if (err) {
                    console.log('getAssessmentAreas() API call failed')
                    console.log(err)
                    dispatch(assessmentAreasHasErrored(true));
                }
        
                const assessmentAreas = JSON.parse(res.text)
                //console.log(areas)

                dispatch(assessmentAreasIsLoading(false))
                dispatch(assessmentAreasFetchDataSuccess(assessmentAreas))
			})
	}
}



