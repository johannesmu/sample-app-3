import { Text, View, StyleSheet, FlatList } from 'react-native'

export function ListItemSeparator ( props:any ) {
    return(
        <View style={ styles.separator }>
            
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: "#4d3e18",
    },
})