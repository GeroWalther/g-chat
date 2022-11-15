import { useState } from "react";
import { TextInput, StyleSheet, View, Image, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import SendButton from "../../UI/SendButton";
import { Colors } from "../../../Constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const InputBox = ({ chatroom }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  async function onSend() {
    const authUser = await Auth.currentAuthenticatedUser();
    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };

    if (images.length > 0) {
      newMessage.images = await Promise.all(images.map(uploadFile));
      setImages([]);
    }

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      if (result.selected) {
        setImages(result.selected.map((s) => s.uri));
      } else {
        setImages([result.uri]);
      }
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;

      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  return (
    <>
      {images.length > 0 && (
        <View style={styles.attachmentsContainer}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <>
                <Image
                  source={{ uri: item }}
                  style={styles.selectedImage}
                  resizeMode="contain"
                />
                <MaterialIcons
                  name="highlight-remove"
                  onPress={() =>
                    setImages((imgs) => [...imgs].filter((img) => img !== item))
                  }
                  size={20}
                  color="gray"
                  style={styles.removeSelectedImage}
                />
              </>
            )}
            horizontal
            keyExtractor={(item) => {
              return item;
            }}
          />
        </View>
      )}

      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={28}
          color={Colors.primaryPink}
        />

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
    </>
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
  attachmentsContainer: {
    alignItems: "flex-end",
  },
  selectedImage: {
    height: 100,
    width: 200,
    margin: 5,
  },
  removeSelectedImage: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
});
