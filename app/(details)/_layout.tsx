import { Stack } from "expo-router";

export default function DetailLayout () {
    return(
        <Stack>
            <Stack.Screen name="[id]" />
            <Stack.Screen name="itemdetail" />
        </Stack>
    )
}