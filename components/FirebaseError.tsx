import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export function FirebaseError(props:any) {
    const [message, setMessage] = useState('')

    const processFirebaseError = (fberror:string) => {
        // firebase error is in the format type/the-error-message, so we need to get the message
        // separated from the type and replace the hyphens with space
        const errormsg =  fberror.split("/")
        return errormsg[1].replaceAll("-", " ")
    }

    useEffect( () => {
        if( props.error ) {
            setMessage( processFirebaseError(props.error) )
        }
    })

    if (props.error) {
        return (
            <View style={ styles.messageContainer }>
                <Text style={ styles.messageText }>{message}</Text>
            </View>
        )
    }
    else {
        return null
    }
}

const styles = StyleSheet.create({
    messageContainer: {
        marginHorizontal: 30,
        padding: 5,
    },
    messageText: {
        textAlign: "center",
        fontSize: 18,
        color: "darkred",
    }
})