import request from 'superagent'

export function employeesHasErrored(bool) {
    return {
        type: 'EMPLOYEES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function employeesIsLoading(bool) {
    return {
        type: 'EMPLOYEES_IS_LOADING',
        isLoading: bool
    };
}

export function addEmployee(code, name, title, bank, branch) {
	return (dispatch) => {
        dispatch(employeesIsLoading(true))

		request
            .post('http://localhost:3001/employees')
            .send({ code:code, name:name, title:title, default_bank_id:bank, default_branch_id:branch })
            .end((err, res) => {
                if (err) {
                    //console.log('addEmployee() API call failed')
                    dispatch(employeesHasErrored(true))
                }
                //console.log('addEmployee() API call succeeded')
                dispatch(employeesIsLoading(false))
                dispatch(getEmployees())
			})
	}
}

export function deleteEmployee(id) {
	return (dispatch) => {
        dispatch(employeesIsLoading(true))

        request
            .delete('http://localhost:3001/employees/' + id)
            .end((err, res) => {
                if (err) {
                    //console.log('addEmployee() API call failed')
                    dispatch(employeesHasErrored(true))
                }
                //console.log('addEmployee() API call succeeded')
                dispatch(employeesIsLoading(false))
                dispatch(getEmployees())
			})
	}
}

export function updateEmployee(id, code, name, title, bank, branch) {
	return (dispatch) => {
        dispatch(employeesIsLoading(true))

        console.log(id)
        console.log(code)
        console.log(name)
        console.log(title)
        console.log(bank)
        console.log(branch)

        request
            .put('http://localhost:3001/employees/' + id)
            .send({ id: id, code: code, name:name, title:title, default_bank_id:bank, default_branch_id:branch })
            .end((err, res) => {
                if (err) {
                    //console.log('addEmployee() API call failed')
                    dispatch(employeesHasErrored(true))
                }
                //console.log('addEmployee() API call succeeded')
                dispatch(employeesIsLoading(false))
                dispatch(getEmployees())
			})
	}
}



export function employeesFetchDataSuccess(employees) {
    return {
        type: 'EMPLOYEES_FETCH_DATA_SUCCESS',
        employees
    }
}


export function getEmployees() {
	return (dispatch) => {
        dispatch(employeesIsLoading(true));

		request
            .get('http://localhost:3001/employees')
            .end((err, res) => {
                if (err) {
                    dispatch(employeesHasErrored(true));
                }
        
                const employees = JSON.parse(res.text)

                dispatch(employeesIsLoading(false))
                dispatch(employeesFetchDataSuccess(employees))
			})
	}
}

export function getEmployee(id) {
	return (dispatch) => {
        dispatch(employeesIsLoading(true));

		request
            .get('http://localhost:3001/employees/' + id)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    dispatch(employeesHasErrored(true));
                }
        
                const employee = JSON.parse(res.text)
                const employees = []
                employees.push(employee)

                dispatch(employeesIsLoading(false))
                dispatch(employeesFetchDataSuccess(employees))
			})
	}
}



