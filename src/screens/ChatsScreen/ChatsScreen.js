import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./queries";
import { useEffect, useState } from "react";

const ChatsScreen = () => {
  const [loading, setLoading] = useState(false);
  const [chatRooms, setCatRooms] = useState([]);

  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    );

    const rooms = response?.data?.getUser?.ChatRooms?.items.filter(
      (item) => !item._deleted
    );

    const sortedRooms = rooms.sort(
      (r1, r2) =>
        new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
    );
    setCatRooms(sortedRooms);

    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRooms}
      style={styles.listItem}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      refreshing={loading}
      onRefresh={fetchChatRooms}
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
