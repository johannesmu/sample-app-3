import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

export default function Authentication() {
    return(
        <View>
            <Text>Authentication Screen</Text>
            <Link href="/(tabs)">
                <Text>Go to home</Text>
            </Link>
        </View>
    )
}