import { View, Text, Stylesheet } from 'react-native'
import { Link } from 'expo-router'

export default function About () {
    return (
        <View>
            <Text>About Screen! Hello!</Text>
            <Link href="./index">
                <Text>Back to auth</Text>
            </Link>
        </View>
    )
}