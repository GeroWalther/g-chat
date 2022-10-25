import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "../screens/ChatsScreen";
import NotImplementedScreen from "../screens/NotImplementedScreen";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../Constants/Colors";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let ionName;
          size = 24;
          if (route.name === "Status") {
            ionName = focused
              ? "signal-cellular-4-bar"
              : "signal-cellular-null";
            size = focused ? size + 1 : size - 2;
          } else if (route.name === "Chats") {
            ionName = focused ? "chat-bubble" : "chat-bubble-outline";
            size = focused ? size + 1 : size - 2;
          } else if (route.name === "Camera") {
            ionName = focused ? "camera" : "photo-camera";
            size = focused ? size + 1 : size - 2;
          } else if (route.name === "Settings") {
            ionName = focused ? "settings-backup-restore" : "settings";
            size = focused ? size + 1 : size - 2;
          } else if (route.name === "Calls") {
            ionName = focused ? "call" : "add-call";
            size = focused ? size + 1 : size - 2;
          }
          return <MaterialIcons name={ionName} size={size} color={color} />;
        },
        headerTintColor: Colors.gray600,
        headerStyle: { backgroundColor: Colors.primary50 },
        tabBarStyle: {
          backgroundColor: Colors.primary50,
          padding: 8,
          // height: 60,
        },
        tabBarActiveTintColor: Colors.primaryPink,
        tabBarLabelStyle: {
          fontSize: 12,
          //padding: 5,
        },
        tabBarIconStyle: {
          // marginBottom: -5,
        },
      })}
    >
      <Tab.Screen name="Status" component={NotImplementedScreen} />
      <Tab.Screen name="Calls" component={NotImplementedScreen} />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons
              name="message-plus-outline"
              size={24}
              color={Colors.primaryPink}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 25,
            marginLeft: -25,
          },
        }}
      />
      <Tab.Screen name="Camera" component={NotImplementedScreen} />
      <Tab.Screen name="Settings" component={NotImplementedScreen} />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
