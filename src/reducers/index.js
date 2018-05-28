import { combineReducers } from 'redux'
import { banks, banksHasErrored, banksIsLoading } from './banks'
import { callCodes, callCodesHasErrored, callCodesIsLoading } from './callCodes'
import { collateralCodes, collateralCodesHasErrored, collateralCodesIsLoading } from './collateralCodes'
import { investmentTypes, investmentTypesHasErrored, investmentTypesIsLoading } from './investmentTypes'
import { loanTypes, loanTypesHasErrored, loanTypesIsLoading } from './loanTypes'
import { serviceTypes, serviceTypesHasErrored, serviceTypesIsLoading } from './serviceTypes'
import { purposeCodes, purposeCodesHasErrored, purposeCodesIsLoading } from './purposeCodes'
import { disasterTypes, disasterTypesHasErrored, disasterTypesIsLoading } from './disasterTypes'
import { declarationTypes, declarationTypesHasErrored, declarationTypesIsLoading } from './declarationTypes'
import { assistanceTypes, assistanceTypesHasErrored, assistanceTypesIsLoading } from './assistanceTypes'
import { branches, branchesHasErrored, branchesIsLoading } from './branches'
import { assessmentAreas, assessmentAreasHasErrored, assessmentAreasIsLoading } from './assessmentAreas'
import { employees, employeesHasErrored, employeesIsLoading } from './employees'
import { entities, entitiesHasErrored, entitiesIsLoading } from './entities'
import { activities, activitiesHasErrored, activitiesIsLoading } from './activities'
import { activityTypes, activityTypesHasErrored, activityTypesIsLoading } from './activityTypes'

const rootReducer = combineReducers({
  banks, banksHasErrored, banksIsLoading,
  callCodes, callCodesHasErrored, callCodesIsLoading,
  collateralCodes, collateralCodesHasErrored, collateralCodesIsLoading,
  investmentTypes, investmentTypesHasErrored, investmentTypesIsLoading,
  loanTypes, loanTypesHasErrored, loanTypesIsLoading,
  serviceTypes, serviceTypesHasErrored, serviceTypesIsLoading,
  purposeCodes, purposeCodesHasErrored, purposeCodesIsLoading,
  disasterTypes, disasterTypesHasErrored, disasterTypesIsLoading,
  declarationTypes, declarationTypesHasErrored, declarationTypesIsLoading,
  assistanceTypes, assistanceTypesHasErrored, assistanceTypesIsLoading,
  branches, branchesHasErrored, branchesIsLoading,
  assessmentAreas, assessmentAreasHasErrored, assessmentAreasIsLoading,
  employees, employeesHasErrored, employeesIsLoading,
  entities, entitiesHasErrored, entitiesIsLoading,
  activities, activitiesHasErrored, activitiesIsLoading,
  activityTypes, activityTypesHasErrored, activityTypesIsLoading
})

export default rootReducer

