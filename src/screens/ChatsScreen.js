import { FlatList, StyleSheet } from "react-native";
import ChatListItem from "../components/ChatListItem/ChatListItem";
import chats from "../../assets/data/chats.json";

const ChatsScreen = () => {
  return (
    <FlatList
      style={styles.listItem}
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
    />
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  listItem: {
    padding: 2,
  },
});
