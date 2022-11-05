import { Text, Image, StyleSheet, Pressable, View } from "react-native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
dayjs.extend(relativeTime);
import { AntDesign, FontAwesome } from "@expo/vector-icons";

function ContactListItem({
  user,
  onPress = () => {},
  selectable = false,
  isSelected = false,
}) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.img} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>

      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color={Colors.primaryPink} />
        ) : (
          <FontAwesome name="circle-thin" size={25} color="#9c9c9c" />
        ))}
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
    marginRight: 15,
  },

  name: {
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ContactListItem;
