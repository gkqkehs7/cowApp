import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import app from '../firebase'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const DatePicker = ({ getDate }) => {

    const placeholder = "날짜를 선택해주세요";
    const [text, onChangeText] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const db = getFirestore();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {

        const filename = date.format("yyyy-MM-dd")

        //그 날짜에 대한 문서가 있는지 부터 찾는다.
        const docRef = doc(db, "alert", `${filename}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) { //있을 시
            hideDatePicker();
            getDate(date.format("yyyy-MM-dd"))
            onChangeText(date.format("yyyy-MM-dd"))
        } else { //없을 시
            const file2 = doc(db, 'alert', filename)
            setDoc(file2, {
                dateId: filename,
                content: []
            }, { merge: true })

            hideDatePicker();
            getDate(date.format("yyyy-MM-dd"))
            onChangeText(date.format("yyyy-MM-dd"))
        }
    };

    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };

    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        pointerEvents="none"
                        style={styles.textInput}
                        placeholder={placeholder}
                        placeholderTextColor="#000000"
                        underlineColorAndroid="transparent"
                        editable={false}
                        value={text}
                    />
                    <DateTimePickerModal
                        headerTextIOS={placeholder}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </TouchableOpacity>	
            </View>
        </View>
        
  );
}

export default DatePicker

const styles = StyleSheet.create({ 
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 16,
        color: '#000000',
        height: 50, 
        width: 300, 
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    }
})
