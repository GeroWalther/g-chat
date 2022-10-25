import { Text, Image, StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
dayjs.extend(relativeTime);

function CntactListItem({ user }) {
  const navigation = useNavigation();

  function chatNavigation() {}

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
    // flex: 1,
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
