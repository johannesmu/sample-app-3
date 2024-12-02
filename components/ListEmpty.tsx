import { Text, View, StyleSheet } from 'react-native'

export function ListEmpty ( props:any ) {
    return(
        <View style={ styles.empty }>
            <Text style={ styles.emptyText}>
                { props.text }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    empty: {
        padding: 6,
        marginVertical: 200,
    },
    emptyText: {
        fontSize: 32,
        textAlign: "center",
        color: "#CCCCCC",
    }
})