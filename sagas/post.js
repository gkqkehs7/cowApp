import { all, fork, put, takeLatest, call } from 'redux-saga/effects';

import app from '../firebase';

import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
const db = getFirestore()

import {
    WRITE_ALERT_REQUEST,
    WRITE_ALERT_SUCCESS,
    WRITE_ALERT_FAILURE,

    GET_MARKED_REQUEST,
    GET_MARKED_SUCCESS,
    GET_MARKED_FAILURE,

    NEW_COW_REQUEST,
    NEW_COW_SUCCESS,
    NEW_COW_FAILURE, 

    DELETE_PASSED_DAY_REQUEST,
    DELETE_PASSED_DAY_SUCCESS,
    DELETE_PASSED_DAY_FAILURE
} from '../reducers/post';

function newCowAPI(data) {
  
    async function awaitFunc() {
        await setDoc(doc(db, "cow", `${data.id}`), {
            id: data.id,
            content: []
        });
    }
    return awaitFunc()    
}

function* newCow(action) {
    try {
        yield call(newCowAPI, action.data);

        yield put({
            type: NEW_COW_SUCCESS
        });
    } catch (err) {
        yield put({
            type: NEW_COW_FAILURE,
        });
    }
}

function writeAlertAPI() {
   console.log("도착")
}

function* writeAlert() {
    try {
        const result = yield call(writeAlertAPI);

        yield put({
            type: WRITE_ALERT_SUCCESS
        });
    } catch (err) {
        yield put({
            type: WRITE_ALERT_FAILURE,
            error: err.response.data,
        });
    }
}

function getMarkedAPI() {
    const temp = []
    async function getAll() {
   
        const querySnapshot = await getDocs(collection(db, "alert"));
        querySnapshot.forEach((doc) => {
            if(doc.data().content.length > 0) {
                temp.push(doc.data().dateId)
            }
        })
    }

    getAll()
  
    return temp;
}
 
function* getMarked() {
    try {
        const result = yield call(getMarkedAPI);
        console.log(result)
        yield put({
            type: GET_MARKED_SUCCESS,
            data: result
        });
    } catch (err) {
        yield put({
            type: GET_MARKED_FAILURE,
            error: err.response.data,
        });
    }
}
 

function deletePassedDayAPI(data) { 
  
    async function deleteDays() {
        const temp = []
        var nowDate = new Date(data)
      
        const querySnapshot = await getDocs(collection(db, "alert"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id) //문서의 이름가져오는법 doc.id 데이터가져오는 법 doc.data()

            var date = new Date(doc.id)
            if(nowDate > date) {
                temp.push(doc.id)
            }
        
        })

        temp.forEach((day) => {
            deleteDoc(doc(db, "alert", day));
        })

    }

    deleteDays()

}
 
function* deletePassedDay(action) {
    try {
        const result = yield call(deletePassedDayAPI, action.data);
        yield put({
            type: DELETE_PASSED_DAY_SUCCESS,
            data: result
        });
    } catch (err) {
        yield put({
            type: DELETE_PASSED_DAY_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchWriteAlert() {
    yield takeLatest(WRITE_ALERT_REQUEST, writeAlert)
}

function* watchGetMarked() {
    yield takeLatest(GET_MARKED_REQUEST, getMarked)
}

function* watchNewCow() {
    yield takeLatest(NEW_COW_REQUEST, newCow)
}

function* watchDeletePassedDay() {
    yield takeLatest(DELETE_PASSED_DAY_REQUEST, deletePassedDay)
}

export default function* postSaga() {
    yield all([
        fork(watchWriteAlert),
        fork(watchGetMarked),
        fork(watchNewCow),
        fork(watchDeletePassedDay)
    ]);
}
  