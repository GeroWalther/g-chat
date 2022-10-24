import { Text, View, Image, StyleSheet } from "react-native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ChatListItem({ chat }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: chat.user.image }} style={styles.img} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.user.name}
          </Text>
          <Text style={styles.subTile}>
            {dayjs(chat.lastMessage.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </View>
  );
}

export default ChatListItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  img: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 11,
  },
  content: {
    flex: 1,
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    flex: 1,
  },
  subTitle: {
    color: "gray",
  },
});
