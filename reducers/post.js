import produce from 'immer';

export const initialState = {
    writeAlertLoading: false,
    writeAlertDone: false,
    writeAlertError: null,

    marked: [],
    getMarkedLoading: false,
    getMarkedDone: false,
    getMarkedError: null,

    newCowLoading: false,
    newCowDone: false,
    newCowError: null,

    deletePassedDayLoading: false,
    deletePassedDayDone: false,
    deletePassedDayError: null
}; 

export const WRITE_ALERT_REQUEST = "WRITE_ALERT_REQUEST";
export const WRITE_ALERT_SUCCESS = "WRITE_ALERT_SUCCESS";
export const WRITE_ALERT_FAILURE = "WRITE_ALERT_FAILURE";

export const GET_MARKED_REQUEST = "GET_MARKED_REQUEST";
export const GET_MARKED_SUCCESS = "GET_MARKED_SUCCESS";
export const GET_MARKED_FAILURE = "GET_MARKED_FAILURE";

export const NEW_COW_REQUEST = "NEW_COW_REQUEST";
export const NEW_COW_SUCCESS = "NEW_COW_SUCCESS";
export const NEW_COW_FAILURE = "NEW_COW_FAILURE";

export const DELETE_PASSED_DAY_REQUEST = "DELETE_PASSED_DAY_REQUEST";
export const DELETE_PASSED_DAY_SUCCESS = "DELETE_PASSED_DAY_SUCCESS";
export const DELETE_PASSED_DAY_FAILURE = "DELETE_PASSED_DAY_FAILURE";


const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case DELETE_PASSED_DAY_REQUEST:
            draft.deletePassedDayLoading = true;
            draft.deletePassedDayDone = false;
            draft.deletePassedDayError = null;
            break;
        case DELETE_PASSED_DAY_SUCCESS:
            draft.deletePassedDayLoading = false;
            draft.deletePassedDayDone = true;
            break;
        case DELETE_PASSED_DAY_FAILURE:
            draft.deletePassedDayLoading = false
            draft.deletePassedDayError = action.error
            break;

        
        case NEW_COW_REQUEST:
            draft.newCowLoading = true;
            draft.newCowDone = false;
            draft.newCowError = null;
            break;
        case NEW_COW_SUCCESS:
            draft.newCowLoading = false;
            draft.newCowDone = true;
            break;
        case NEW_COW_FAILURE:
            draft.newCowLoading = false
            draft.newCowError = action.error
            break;

        case WRITE_ALERT_REQUEST:
            draft.writeAlertLoading = true;
            draft.writeAlertDone = false;
            draft.writeAlertError = null;
            break;
        case WRITE_ALERT_SUCCESS:
            draft.writeAlertLoading = false;
            draft.writeAlertDone = true;
            break;
        case WRITE_ALERT_FAILURE:
            draft.writeAlertLoading = false
            draft.writeAlertError = action.error
            break;

        case GET_MARKED_REQUEST:
            draft.getMarkedLoading = true;
            draft.getMarkedDone = false;
            draft.getMarkedError = null;
            break;
        case GET_MARKED_SUCCESS:{
            
            draft.getMarkedLoading = false;
            draft.getMarkedDone = true;
            }
            break;
        case GET_MARKED_FAILURE:
            draft.getMarkedLoading = false
            draft.getMarkedError = action.error
            break;
    default:
        break;
    }
})

export default reducer;
