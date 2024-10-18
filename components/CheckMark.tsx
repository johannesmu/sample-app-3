import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export function CheckMark ( props:any ) {
    if( props.show == true ) {
        return (
            <Ionicons name="checkmark" size={16} color="green" style={ styles.icon } />
        )
    }
    else {
        return null
    }
}

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
    }
})