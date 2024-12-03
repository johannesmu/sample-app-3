import { View, Text, TextInput, StyleSheet } from 'react-native'
export default function ItemDetail( props:any ) {
    return (
        <View style={ styles.container }>
            <Text>Item detail</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})