import request from 'superagent'

export function declarationTypesHasErrored(bool) {
    return {
        type: 'DECLARATIONTYPES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function declarationTypesIsLoading(bool) {
    return {
        type: 'DECLARATIONTYPES_IS_LOADING',
        isLoading: bool
    };
}

export function addDeclarationType(code, description) {
	return (dispatch) => {
        dispatch(declarationTypesIsLoading(true))

		request
            .post('http://localhost:3001/declaration_types')
            .send({code:code, description:description})
            .end((err, res) => {
                if (err) {
                    //console.log('addDeclarationType() API call failed')
                    dispatch(declarationTypesHasErrored(true))
                }
                //console.log('addDeclarationType() API call succeeded')
                dispatch(declarationTypesIsLoading(false))
                dispatch(getDeclarationTypes())
			})
	}
}

export function deleteDeclarationType(id) {
	return (dispatch) => {
        dispatch(declarationTypesIsLoading(true))

        request
            .delete('http://localhost:3001/declaration_types/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addDeclarationType() API call failed')
                    dispatch(declarationTypesHasErrored(true))
                }
                //console.log('addDeclarationType() API call succeeded')
                dispatch(declarationTypesIsLoading(false))
                dispatch(getDeclarationTypes())
			})
	}
}

export function updateDeclarationType(id, code, description) {
	return (dispatch) => {
        dispatch(declarationTypesIsLoading(true))

        request
            .put('http://localhost:3001/declaration_types/' + id)
            .send({id: id, code: code, description: description })
            .end((err, res) => {
                if (err) {
                    //console.log('addDeclarationType() API call failed')
                    dispatch(declarationTypesHasErrored(true))
                }
                //console.log('addDeclarationType() API call succeeded')
                dispatch(declarationTypesIsLoading(false))
                dispatch(getDeclarationTypes())
			})
	}
}



export function declarationTypesFetchDataSuccess(declarationTypes) {
    return {
        type: 'DECLARATIONTYPES_FETCH_DATA_SUCCESS',
        declarationTypes
    }
}


export function getDeclarationTypes() {
	return (dispatch) => {
        dispatch(declarationTypesIsLoading(true));

		request
            .get('http://localhost:3001/declaration_types')
            .end((err, res) => {
                if (err) {
                    dispatch(declarationTypesHasErrored(true));
                }
        
                const declarationTypes = JSON.parse(res.text)

                dispatch(declarationTypesIsLoading(false))
                dispatch(declarationTypesFetchDataSuccess(declarationTypes))
			})
	}
}



