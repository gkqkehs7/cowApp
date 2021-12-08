import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import app from '../firebase'
import { getFirestore, query, where, collection, getDocs } from 'firebase/firestore';


const AlertDateScreen = ({ route }) => {

    const db = getFirestore();

    const [ alertDatas, setAlertDatas ] = useState([])
    
    useEffect(() => {
        async function getData() {

            const temp = []
            const data = query(collection(db, "alert"), where("dateId", "==", route.params.date ));
            const querySnapshot = await getDocs(data);
            querySnapshot.forEach((doc) => {
                temp.push(doc.data())
            });
            console.log(temp[0].content)
            setAlertDatas(temp[0].content)
        }
        getData()
    },[])

    return (
        <ScrollView>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{route.params.date}</Text>
            </View>

            <View style={styles.alertContainer}>
                {
                    alertDatas ? 
                    (
                        alertDatas.map((v,key) => (
                        <View key={key} style={styles.textContainer}>
                            <Text style={styles.text}>{v.cowId}번소 {v.alert}</Text>
                        </View>
                        )) 
                    ) : 
                    ( 
                        <View style={{width:100, height:100}}>
                            <Text>일정이 없습니다</Text>
                        </View>
                    )
                }
            </View>
            
           
        </ScrollView>
    )
}

export default AlertDateScreen

const styles = StyleSheet.create({
    dateContainer: {
        marginTop: 15,
        alignItems:'center',
    },
    dateText: {
        fontWeight: '600',
        fontSize: 17,
    },


    alertContainer: {
        marginHorizontal:20,
        marginVertical: 15
    },
    textContainer: {
        marginVertical:3,
        borderBottomWidth:2,
        borderColor:'black',
        borderRadius: 6,
        marginBottom:10,
        paddingHorizontal:10,
        paddingVertical:5
    }, 
    text: {
        fontWeight: '400',
        fontSize:15,
        color:'black'
    }
})
