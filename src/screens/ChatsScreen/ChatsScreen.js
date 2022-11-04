import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";
import { useEffect, useState } from "react";

const ChatsScreen = () => {
  const [chatRoom, setCatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );

      const rooms = response?.data?.getUser?.ChatRooms?.items || [];

      const sortedRooms = rooms.sort(
        (r1, r2) =>
          new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
      );
      setCatRooms(sortedRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      style={styles.listItem}
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
