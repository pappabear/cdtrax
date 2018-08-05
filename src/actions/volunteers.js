import request from 'superagent'

export function volunteersHasErrored(bool) {
    return {
        type: 'VOLUNTEERS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function volunteersIsLoading(bool) {
    return {
        type: 'VOLUNTEERS_IS_LOADING',
        isLoading: bool
    };
}

export function addVolunteer(code, name, title, bank, branch) {
	return (dispatch) => {
        dispatch(volunteersIsLoading(true))

		request
            .post('https://cdtrax-backend-api.herokuapp.com/volunteers')
            .send({ employee_code:code, name:name, title:title })
            .end((err, res) => {
                if (err) {
                    console.log('addVolunteer() API call failed')
                    console.log(err)
                    dispatch(volunteersHasErrored(true))
                }
                //console.log('addVolunteer() API call succeeded')
                dispatch(volunteersIsLoading(false))
                dispatch(getVolunteers())
			})
	}
}

export function deleteVolunteer(id) {
	return (dispatch) => {
        dispatch(volunteersIsLoading(true))

        request
            .delete('https://cdtrax-backend-api.herokuapp.com/volunteers/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('addVolunteer() API call failed')
                    console.log(err)
                    dispatch(volunteersHasErrored(true))
                }
                //console.log('addVolunteer() API call succeeded')
                dispatch(volunteersIsLoading(false))
                dispatch(getVolunteers())
			})
	}
}

export function updateVolunteer(id, code, name, title, bank, branch) {
	return (dispatch) => {
        dispatch(volunteersIsLoading(true))

        request
            .put('https://cdtrax-backend-api.herokuapp.com/volunteers/' + id)
            .send({ id: id, employee_code:code, name:name, title:title })
            .end((err, res) => {
                if (err) {
                    console.log('addVolunteer() API call failed')
                    console.log(err)
                    dispatch(volunteersHasErrored(true))
                }
                //console.log('addVolunteer() API call succeeded')
                dispatch(volunteersIsLoading(false))
                dispatch(getVolunteers())
			})
	}
}



export function volunteersFetchDataSuccess(volunteers) {
    return {
        type: 'VOLUNTEERS_FETCH_DATA_SUCCESS',
        volunteers
    }
}


export function getVolunteers() {
	return (dispatch) => {
        dispatch(volunteersIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/volunteers')
            .end((err, res) => {
                if (err) {
                    console.log('getVolunteers() API call failed')
                    console.log(err)
                    dispatch(volunteersHasErrored(true));
                }
        
                const volunteers = JSON.parse(res.text)

                dispatch(volunteersIsLoading(false))
                dispatch(volunteersFetchDataSuccess(volunteers))
			})
	}
}

export function getVolunteer(id) {
	return (dispatch) => {
        dispatch(volunteersIsLoading(true));

		request
            .get('https://cdtrax-backend-api.herokuapp.com/volunteers/' + id)
            .end((err, res) => {
                if (err) {
                    console.log('getVolunteer() API call failed')
                    console.log(err)
                    dispatch(volunteersHasErrored(true));
                }
        
                const volunteer = JSON.parse(res.text)
                const volunteers = []
                volunteers.push(volunteer)

                dispatch(volunteersIsLoading(false))
                dispatch(volunteersFetchDataSuccess(volunteers))
			})
	}
}



