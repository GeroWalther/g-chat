import { Text, View, Image, StyleSheet } from "react-native";
function ChatListItem() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/assets/images/lukas.jpeg")}
        style={styles.img}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            Lukas
          </Text>
          <Text style={styles.subTile}>7:30</Text>
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          Oke iadsuc
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
    fontWeight: "bold",
    borderBottomColor: "#bbbbbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
  },
  subTitle: {
    color: "gray",
  },
});
