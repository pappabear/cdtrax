import request from 'superagent'

export function entitiesHasErrored(bool) {
    return {
        type: 'ENTITIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function entitiesIsLoading(bool) {
    return {
        type: 'ENTITIES_IS_LOADING',
        isLoading: bool
    };
}

export function addEntity(name, address, city, state, zip, phone, mission, number_of_employees, revenue, website) {
	return (dispatch) => {
        dispatch(entitiesIsLoading(true))

		request
            .post('http://localhost:3001/entities')
            .send({ name:name, address:address, city:city, state:state, zip:zip, phone:phone, mission:mission, number_of_employees:number_of_employees, revenue:revenue, website:website })
            .end((err, res) => {
                if (err) {
                    //console.log('addEntity() API call failed')
                    dispatch(entitiesHasErrored(true))
                }
                //console.log('addEntity() API call succeeded')
                dispatch(entitiesIsLoading(false))
                dispatch(getEntities())
			})
	}
}

export function deleteEntity(id) {
	return (dispatch) => {
        dispatch(entitiesIsLoading(true))

        request
            .delete('http://localhost:3001/entities/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addEntity() API call failed')
                    dispatch(entitiesHasErrored(true))
                }
                //console.log('addEntity() API call succeeded')
                dispatch(entitiesIsLoading(false))
                dispatch(getEntities())
			})
	}
}

export function updateEntity(id, name, address, city, state, zip, phone, mission, number_of_employees, revenue, website) {
	return (dispatch) => {
        dispatch(entitiesIsLoading(true))

        request
            .put('http://localhost:3001/entities/' + id)
            .send({ id: id, name:name, address:address, city:city, state:state, zip:zip, phone:phone, mission:mission, number_of_employees:number_of_employees, revenue:revenue, website:website })
            .end((err, res) => {
                if (err) {
                    //console.log('addEntity() API call failed')
                    dispatch(entitiesHasErrored(true))
                }
                //console.log('addEntity() API call succeeded')
                dispatch(entitiesIsLoading(false))
                dispatch(getEntities())
			})
	}
}



export function entitiesFetchDataSuccess(entities) {
    return {
        type: 'ENTITIES_FETCH_DATA_SUCCESS',
        entities
    }
}


export function getEntities() {
	return (dispatch) => {
        dispatch(entitiesIsLoading(true));

		request
            .get('http://localhost:3001/entities')
            .end((err, res) => {
                if (err) {
                    dispatch(entitiesHasErrored(true));
                }
        
                const entities = JSON.parse(res.text)

                dispatch(entitiesIsLoading(false))
                dispatch(entitiesFetchDataSuccess(entities))
			})
	}
}

export function getEntity(id) {
	return (dispatch) => {
        dispatch(entitiesIsLoading(true));

		request
            .get('http://localhost:3001/entities/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(entitiesHasErrored(true));
                }
        
                const entity = JSON.parse(res.text)
                const entities = []
                entities.push(entity)

                dispatch(entitiesIsLoading(false))
                dispatch(entitiesFetchDataSuccess(entities))
			})
	}
}



