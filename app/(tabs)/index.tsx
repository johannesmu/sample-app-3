import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { router } from 'expo-router';


export default function HomeScreen() {
  const auth = useContext(AuthenticationContext)

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Text>Show stats here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
