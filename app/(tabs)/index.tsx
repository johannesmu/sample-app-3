import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View style={ styles.form }>
      <Text>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 10,
  }
});
