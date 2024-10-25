import { Text, View, StyleSheet, FlatList } from 'react-native'

export function ListHeader ( props:any ) {
    return(
        <View style={ styles.header }>
            <Text style={ styles.headerText}>
                { props.text }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 6,
        backgroundColor: "pink",
    },
    headerText: {
        fontSize: 24,
        textAlign: "center",
    }
})