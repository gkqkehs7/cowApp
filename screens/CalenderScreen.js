import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/AntDesign';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



const CalenderScreen = ({ navigation, route }) => {

    return (
        <View style={{ paddingVertical: 150, flex: 1 }}>
          <Calendar
            markedDates={route.params.mark}
            // Initially visible month. Default = Date()
            current={Date()}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={undefined}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={undefined}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => { navigation.navigate('AlertDate', { date: day.dateString })  }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {console.log('month changed', month)}}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => direction === "left" ? (
                <Icon name="left" size={15}/>
                ) : (
                <Icon name="right" size={15}/>
                )
            }
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={7}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            /** Replace default month and year title with custom one. the function receive a date as parameter. */
            //renderHeader={(date) => {/*Return JSX*/}}
            enableSwipeMonths={true}
          />
        </View>
       )
}

export default CalenderScreen

const styles = StyleSheet.create({
    Button: {

    }
})
