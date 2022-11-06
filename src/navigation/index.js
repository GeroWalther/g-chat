import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../../Constants/Colors";
import AddContactsToGroup from "../screens/AddsContactsToGroupScreen";

import ChatScreen from "../screens/ChatScreen";
import ContactsScreen from "../screens/ContactsScreen";
import GroupInfoScreen from "../screens/GroupInfoScreen";
import NewGroupScreen from "../screens/NewGroupScreen";
import MainTabNavigator from "./MainTabNav";

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: Colors.primary50 } }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Group Info" component={GroupInfoScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="New Group" component={NewGroupScreen} />
        <Stack.Screen name="Add Contacts" component={AddContactsToGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;
