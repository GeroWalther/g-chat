import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const isMyMessage = () => {
    return message.user.id === "u1";
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? Colors.chatBG : Colors.whiteChatBG,
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    // alignSelf: "flex-start",
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  time: {
    color: Colors.primary200,
    alignSelf: "flex-end",
  },
});
