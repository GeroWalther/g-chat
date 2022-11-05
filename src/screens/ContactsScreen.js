import { useState, useEffect } from "react";
import { FlatList, Pressable, Text } from "react-native";
import ContactListItem from "../components/ChatListItem/ContactListItem";

import { MaterialIcons } from "@expo/vector-icons";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { createChatRoom, createUserChatRoom } from "../graphql/mutations";
import { getCommonChatRoomWithUser } from "../services/chatRoomService";

const ContactsScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result.data?.listUsers?.items);
    });
  }, []);

  async function createChatRoomWithUser(user) {
    //Check if we already have a ChatRoom with user
    const existingChatroom = await getCommonChatRoomWithUser(user.id);
    if (existingChatroom) {
      // Navigate to the newly created Chatroom
      navigation.navigate("Chat", { id: existingChatroom.chatRoom.id });
      return;
    }
    // Create a new chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {
        input: {},
      })
    );
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error creating the chat error");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    // Add the clicked user to the ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: user.id },
      })
    );
    // Add the auth user to the ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
      })
    );
    navigation.navigate("Chat", { id: newChatRoom.id });
  }

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ContactListItem
          user={item}
          onPress={() => createChatRoomWithUser(item)}
        />
      )}
      style={{ backgroundColor: "white" }}
      ListHeaderComponent={() => (
        <Pressable
          onPress={() => {
            navigation.navigate("New Group");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            name="group"
            size={24}
            color="royalblue"
            style={{
              marginRight: 20,
              backgroundColor: "gainsboro",
              padding: 7,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text style={{ color: "royalblue", fontSize: 16 }}>New Group</Text>
        </Pressable>
      )}
    />
  );
};

export default ContactsScreen;
