import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";
import { useEffect, useState } from "react";

const ChatsScreen = () => {
  const [chatRooms, setCatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );
      setCatRooms(response.data.getUser.ChatRooms.items);
    };
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      style={styles.listItem}
      data={chatRooms}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
    />
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  listItem: {
    padding: 2,
    backgroundColor: "white",
  },
});
