import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
import { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";

dayjs.extend(relativeTime);

function ChatListItem({ chat }) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const userItem = chatRoom.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  // fetch Chat Room
  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chat.id]);

  function chatNavigation() {
    navigation.navigate("Chat", { id: chatRoom.id, name: user?.name });
  }

  return (
    <Pressable onPress={chatNavigation} style={styles.container}>
      <Image source={{ uri: user?.image }} style={styles.img} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>

          {chatRoom.LastMessage && (
            <Text style={styles.time}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chatRoom.LastMessage?.text}
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
