import { View, Text } from "react-native"
import { useState, useEffect } from "react"

export function DisplayDate( props:any ) {
    const [ date, setDate ] = useState<string>('date')
    const days = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    const plainDate = ( dateObj:Date ) => {
        const date:Date = new Date( dateObj )
        const dayOfTheWeek = days[date.getDay()]
        const theDate = date.getDate()
        const theMonth = months[date.getMonth()]
        const theYear = date.getFullYear()
        return `${dayOfTheWeek} ${theDate} ${theMonth} ${theYear}`
    }

    const dateDiff = ( dateObj:Date ) => {
        const now = new Date().getTime()
        const date = new Date( dateObj ).getTime()
        const diff = now - date
        const days = diff / 84600000
        console.log( date )
        return diff.toString()
    }

    useEffect( () => {
        if( props.mode == 'date' ) {
            setDate( plainDate( props.date ) )
        }
        else if( props.mode == 'diff' ) {
            setDate( dateDiff( props.date ) )
        }
        
    }, [ props.date ])

    return(
        <View>
            <Text>{ date }</Text>
        </View>
    )
}