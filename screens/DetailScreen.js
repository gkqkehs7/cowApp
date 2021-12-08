import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Alert, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import app from '../firebase'
import { getFirestore, query, where, doc, collection, 
        getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import Icon from 'react-native-vector-icons/AntDesign';

import { useSelector } from 'react-redux';

const DetailScreen = ({ route, navigation }) => {

    const [cowState, setCowState] = useState("")
    const [cowDatas, setCowDatas] = useState([])
    const [alertDatas, setAlertDatas] = useState([])
    const db = getFirestore();


    const { writeAlertDone } = useSelector((state) => state.post)

    useEffect(() => {

        async function getData() {
            const temp = []
            const q = query(collection(db, "cow"), where("id", "==", route.params.id ));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                temp.push(doc.data())
            });

            var date = new Date(temp[0].alertContent.date)
            var nDate = new Date(nowDate()) //오늘 
            if(nDate > date) {
                setAlertDatas(null)
                setCowDatas(temp[0].content)
            } else {
                setAlertDatas(temp[0].alertContent)
                setCowDatas(temp[0].content)
            }

         
        }
        getData()
    },[writeAlertDone])

    function nowDate() {
        const date = new Date();
        const now = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        return now
    }
    
    const onSubmit = async () => {
        try { 
            if(!cowState) {
                console.log(cowState.length)
                return Alert.alert("내용을 입력하세요!")
            }
            const file = doc(db, "cow", `${route.params.id}`);
           
            const data = {
                state: cowState,
                date: nowDate(),
            }
            await updateDoc(file, {
                content: arrayUnion(data)
            })

            setCowDatas(prev => [...prev, data])
            setCowState("")
          } catch (e) {
      
          }
    }
    
    const onRemove = async (data, dataIndex) => {

        setCowDatas(cowDatas.filter(function(element, index) {
            return index !== dataIndex
        }))

        const removeData = {
            date: data.date,
            state: data.state
        }
        const file = doc(db, "cow", `${route.params.id}`);
        await updateDoc(file, {
            content: arrayRemove(removeData)
        })
       
    }

    return (
        
        <ScrollView behavior="padding" style={styles.container}>

            <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', paddingTop:10}}> {route.params.id}번 소</Text>

            <View>

                    <View style={styles.alertTextContainer}>


                        {
                            alertDatas ? (<Text style={styles.alertText}>{alertDatas.date}  {alertDatas.alert}</Text>) : 
                            ( <Text style={styles.alertText}>접종 예정 없음</Text>)
                        }
                       

                        <Button
                            type="clear" 
                            title="계획 추가"
                            onPress={() => navigation.navigate('Alert', { id: route.params.id })} 
                        />
                    </View>
    
                    <View style={styles.textInputContainer}>
                        <TextInput 
                            style={styles.textInput}
                            onChangeText={(text) => setCowState(text)} 
                            placeholder="입력할 내용" 
                            autoFocus 
                            value={cowState}/>

                   
                        <Button 
                            onPress={onSubmit}
                            type="clear"
                            style={styles.uploadButton}
                            title="입력" />
                     
                       
                    </View>
                    
            </View>

            <View style={styles.textAll}>
            {
                cowDatas && cowDatas.map((v, index, key) => (
                    <View style={{ flexDirection:'row', justifyContent:'space-between'}}>

                        <View key={key} style={styles.textContainer}>
                            <Text style={styles.text}>{v.state}</Text>

                            <View style={styles.removeContainer}>
                                <Text style={styles.text}>{v.date}</Text>
                                <Icon
                                    onPress={() => onRemove(v,index)} 
                                    style={styles.removeButton} name="close" size={15}/>
                            </View>
                           
                        </View>
                        
                    </View>
                ))
            }
            </View>
          

        </ScrollView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    alertTextContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal: 12,
        marginTop:10,
        marginBottom: 20
    },
    alertText: {
        fontWeight: '600',
        fontSize:15,
        color:'red'
    },


    textInputContainer: {
        alignItems:'center',
        flexDirection:'row',
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
    uploadButton: {
        margin:10
    },
    
    textAll: {
        paddingHorizontal:20
    },
    textContainer: {
        flex: 1,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text: {
        fontSize: 15
    },

    removeContainer: {
        flexDirection:'row',
        alignItems:'center'
    },
    removeButton: {
        paddingLeft: 3
    }
})
