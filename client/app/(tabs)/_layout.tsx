import { FontAwesome, FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' , headerShown: false }}>
        <Tabs.Screen
        name="index"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="crop-screen"
        options={{
          title: "Check Crop",
          tabBarIcon: ({ color }) => <FontAwesome6 name="sun-plant-wilt" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
              name="chatbot-screen"
              options={{
                title: "Chatbot",
                tabBarIcon: ({ color }) => <FontAwesome5 name="robot" size={24} color={color} />,
              }}
      />

      <Tabs.Screen
              name="faq-screen"
              options={{
                title: "FAQ",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat-question-outline" size={24} color={color} />,
              }}
      />

    </Tabs>
  );
}