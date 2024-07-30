import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
  );
}