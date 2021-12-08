import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import DatePicker from './DatePicker'

import app from '../firebase'
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';


import { useDispatch } from 'react-redux';
import { WRITE_ALERT_REQUEST } from '../reducers/post'

const AlertScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();
    
    const [alertText, setAlertText] = useState("")
    const [alertDate, setAlertDate] = useState("")
    const db = getFirestore();

    const onSubmit = async () => {
        try {
            if (!alertText) {
                return Alert.alert('내용을 입력해주세요!')
            }
    
            if (!alertDate) {
                return Alert.alert("날짜를 선택해주세요!")
            }
    
            //cow에 저장 
            const data = {
                alert: alertText,
                date: alertDate
            }
            const file = doc(db, "cow", `${route.params.id}`);
            await updateDoc(file, {
                alertContent: data
            })

            //alert에 저장
            const AlertData = {
                cowId: route.params.id,
                alert: alertText
            }
            const AlertFile = doc(db,"alert", `${alertDate}`);
            await updateDoc(AlertFile, {
                content: arrayUnion(AlertData)
            })

            dispatch({
                type: WRITE_ALERT_REQUEST,
            })

            navigation.goBack()

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getDate = (date) => {
        setAlertDate(date)
    }

    return (
        <KeyboardAvoidingView style={{backgroundColor:'white', flex:1}}>

            <View style={styles.textInputContainer}>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={(text) => setAlertText(text)}
                    placeholder="입력할 내용" 
                    autoFocus 
                    value={alertText}/>
            </View>
            
            <View style={styles.pickerButtonContainer}>
                <DatePicker
                    onChangeText={(text) => setAlertDate(text)} 
                    style={styles.picker} 
                    getDate={getDate}/>

                <Button 
                    style={styles.submitButton}
                    onPress={onSubmit}
                    title="저장"
                    type="clear" 
                />
            </View>
          
        </KeyboardAvoidingView>
    )
}

export default AlertScreen

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection:'row',
        marginTop:20,
        marginHorizontal: 10,
        marginBottom: 12,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#cdcdcd',
        borderRadius: 6,
    },
    textInput: {
        flex:1,
        margin: 10,
        padding: 4,
    },

    pickerButtonContainer: {
        marginHorizontal:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    picker: {
        flex:1
    },
    submitButton: {
        marginLeft: 20
    },
})
