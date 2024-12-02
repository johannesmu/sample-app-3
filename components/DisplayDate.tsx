import { View, Text } from "react-native"
import { useState, useEffect } from "react"

export function DisplayDate( props:any ) {
    const [ date, setDate ] = useState<string>('date')
    const days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    useEffect( () => {
        const dateTime:any = new Date( props.date )
        const dayOfTheWeek = days[dateTime.getDay()]
        const theDate = dateTime.getDate()
        const theMonth = months[dateTime.getMonth()]
        const theYear = dateTime.getFullYear()
        let saneDate = `${dayOfTheWeek} ${theDate} ${theMonth} ${theYear}`
        setDate( saneDate )
    }, [ props.date ])

    return(
        <View>
            <Text>{ date }</Text>
        </View>
    )
}