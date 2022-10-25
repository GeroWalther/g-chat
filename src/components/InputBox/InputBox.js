import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import SendButton from "../../UI/SendButton";
import { Colors } from "../../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const InputBox = () => {
  const [newMsg, setNewMsg] = useState();

  function onSend() {
    console.warn("smth sth a messg.", newMsg);
    setNewMsg("");
  }
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <AntDesign name="plus" size={28} color={Colors.primaryPink} />

      <TextInput
        placeholder="start typing..."
        style={styles.input}
        onChangeText={setNewMsg}
        value={newMsg}
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
