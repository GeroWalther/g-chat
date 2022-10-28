import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
dayjs.extend(relativeTime);

function CntactListItem({ user }) {
  const navigation = useNavigation();

  async function chatNavigation() {
    //Check if we already have a ChatRoom with user
    const existingChatroom = await getCommonChatRoomWithUser(user.id);
    if (existingChatroom) {
      // Navigate to the newly created Chatroom
      navigation.navigate("Chat", { id: existingChatroom.id });
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
    <Pressable onPress={chatNavigation} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.img} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  img: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 11,
  },
  content: {
    flex: 1,
    // borderBottomColor: Colors.gray400,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },

  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default CntactListItem;
