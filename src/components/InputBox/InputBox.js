import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import SendButton from "../../UI/SendButton";
import { Colors } from "../../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState();

  async function onSend() {
    const authUser = await Auth.currentAuthenticatedUser();
    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };

    const newMsgData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    );

    setText("");

    // set the last msg as last msg
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          chatRoomLastMessageId: newMsgData.data.createMessage.id,
          _version: chatroom._version,
          id: chatroom.id,
        },
      })
    );
  }
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <AntDesign name="plus" size={28} color={Colors.primaryPink} />

      <TextInput
        placeholder="start typing..."
        style={styles.input}
        onChangeText={setText}
        value={text}
      />
      <SendButton
        icon="send"
        size={24}
        color={Colors.primaryPink}
        onPress={onSend}
      />
    </SafeAreaView>
  );
};

export default InputBox;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.primary50,
    padding: 5,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  input: {
    fontSize: 16,

    flex: 1,
    backgroundColor: "white",
    padding: 7,
    paddingHorizontal: 14,
    marginHorizontal: 10,

    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray100,
  },
});
