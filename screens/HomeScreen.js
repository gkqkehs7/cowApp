import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'

import app from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { NEW_COW_REQUEST, DELETE_PASSED_DAY_REQUEST } from '../reducers/post'

const HomeScreen = ({ navigation }) => {

    const [allData, setAllData] = useState([])
    const [uploadDone, setUploadDone] = useState(false)
    const db = getFirestore();
    const dispatch = useDispatch()

    let dateToCalender = []
    let markedDate = {}
    const { writeAlertDone } = useSelector((state) => state.post)

    useEffect(() => { //소들 가져오기
        async function getAll() {

            setUploadDone(false)
            const temp = []
            const querySnapshot = await getDocs(collection(db, "cow"));
            querySnapshot.forEach((doc) => {

                var data = {};
                var date = new Date(doc.data().alertContent && doc.data().alertContent.date)
                var nowDate = new Date(getDate())
                if(nowDate > date) {
                    data = {
                        id: doc.data().id,
                        alert: null
                    }
                } else {
                    // dateToCalender.push(doc.data().alertContent && doc.data().alertContent.date)

                    // var filtered = dateToCalender.filter(function (date) {
                    //     return date != null;
                    // });


                    // filtered.forEach((day) => {
                    //     markedDate[day] = {
                    //         selected: true,
                    //         marked: true, 
                    //         selectedColor: 'red'
                    //     };
                    // });
                    // console.log(markedDate)

                    data = {
                        id: doc.data().id,
                        alert: doc.data().alertContent
                    }
                }
                
                temp.push(data)
            })

            const temp2 = temp.sort((a,b) => a.id - b.id)
            setAllData(temp2)

        }
        getAll()
    }, [uploadDone, writeAlertDone])

    useEffect(() => { 
        
        async function getMark() {
            const temp = []
            const querySnapshot = await getDocs(collection(db, "alert"));
            querySnapshot.forEach((doc) => {
                if(doc.data().content.length > 0) {
                    temp.push(doc.data().dateId)
                }
                
            })

            temp.forEach((day) => {
                markedDate[day] = {
                    selected: true,
                    marked: true, 
                    selectedColor: 'red'
                };
            });
            console.log(markedDate)
        }
        getMark()

    }, [markedDate])


    function getDate() {
        let date = new Date()
        let today = ""
        if(date.getDate() < 10) {
            today = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`
        } else {
            today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        }

        return today;
    }

    //날짜 지난 것 지우기, cow에서 지우기 alert에서 지우기 
    useEffect(() => {
        dispatch({
            type: DELETE_PASSED_DAY_REQUEST,
            data: getDate()
        })
    },[])


    const newCow = () => { //새로운 소 추가 

        dispatch({
            type: NEW_COW_REQUEST,
            data: { id:allData.length+1 }
        })

        navigation.navigate('Detail', { id: allData.length+1 })  
        setUploadDone(true)
    }


    return (
        <ScrollView style={{backgroundColor:'white'}}>
            
            <View style={styles.alertCheckContainer}>
                <TouchableOpacity style={styles.alertCheckButton}
                    onPress={() => navigation.navigate('Calender', { mark: markedDate })} >
                    <Text style={styles.alertCheckText}>일정 확인하기</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.container}>
                <View style={styles.buttonsCover}>
                    {
                        allData.map((data, key) => (
                
                            <TouchableOpacity key={key}
                                style={styles.button}
                                onPress={() => navigation.navigate('Detail', { id:data.id })}>

                                <View style={styles.buttonId}>
                                    <Text style={styles.buttonIdText}>{data.id}번 소</Text>
                                </View>

                                <View style={styles.buttonAlert}>
                                    {
                                        data.alert ? ( <Text style={styles.buttonAlertText}>{data.alert.date} {data.alert.alert}</Text> )
                                        : (<Text style={styles.buttonAlertText}>접종 예정 없음</Text>)
                                
                                    }
                                    
                                </View>

                            </TouchableOpacity>
            
                      
                        ))
                    }
                    
                    <TouchableOpacity style={styles.buttonAdd} onPress={newCow}>
                        <Text style={styles.buttonAddText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
                    
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginVertical:10
    },

    alertCheckContainer: {
        marginTop:20,
        marginHorizontal:20 
    },
    alertCheckButton: {
        height: 50,

        borderWidth:1,
        borderRadius:8,

        justifyContent:'center',
        alignItems:'center'
    },
    alertCheckText: {

    },


    buttonsCover: {
        marginVertical:20,
        marginHorizontal:20 
    },
    button:{
        height: 100,

        marginVertical: 20,

        borderWidth:1,
        borderRadius:8,
    },
    buttonId: {
        position:'absolute',
        top:5,
        left:5
    },
    buttonIdText: {
        fontSize: 25,
        fontWeight: '700'
    },


    buttonAlert: {
        position: 'absolute',
        right:5,
        bottom:5
    },
    buttonAlertText: {
        fontWeight: '800',
        fontSize:15,
        color:'red'
    },



    buttonAdd:{
        height: 100,

        marginVertical: 20,

        borderWidth:1,
        borderRadius:8,

        justifyContent:'center',
        alignItems:'center'
    },
    buttonAddText: {
        fontWeight: '400',
        fontSize: 40,
    }
})
