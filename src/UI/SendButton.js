import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../Constants/Colors";
Colors;

function SendButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <FontAwesome name={icon} size={size} color={color} />
    </Pressable>
  );
}
export default SendButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary100,
    padding: 10,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
