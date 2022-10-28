import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

dayjs.extend(relativeTime);

function ChatListItem({ chat }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  function chatNavigation() {
    navigation.navigate("Chat", { id: chat.id, name: user?.name });
  }

  return (
    <Pressable onPress={chatNavigation} style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.img} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
          <Text style={styles.time}>
            {dayjs(chat.lastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.lastMessage?.text}
        </Text>
      </View>
    </Pressable>
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
    borderBottomColor: Colors.gray400,
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
  time: {
    color: Colors.primary200,
  },
});
