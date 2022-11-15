import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Colors } from "../../../Constants/Colors";
dayjs.extend(relativeTime);
import { Auth, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react-native";
import ImageView from "react-native-image-viewing";

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);
  const [imageSrc, setImageScr] = useState([]);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      setIsMe(message.userID === authUser.attributes.sub);
    };
    isMyMessage();
  }, []);

  useEffect(() => {
    const downloadImages = async () => {
      if (message.images?.length > 0) {
        const uris = await Promise.all(message.images.map(Storage.get));

        setImageScr(uris.map((uri) => ({ uri })));
      }
    };

    downloadImages();
  }, [message.images]);

  const imageContainerWidth = width * 0.8 - 30;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? Colors.chatBG : Colors.whiteChatBG,
          alignSelf: isMe ? "flex-end" : "flex-start",
        },
      ]}
    >
      {imageSrc.length > 0 && (
        <>
          {imageSrc.map((imageSrc) => (
            <Pressable onPress={() => setImageViewerVisible(true)}>
              <Image source={imageSrc} style={styles.image} />
            </Pressable>
          ))}

          <ImageView
            images={imageSrc}
            imageIndex={0}
            visible={imageViewerVisible}
            onRequestClose={() => setImageViewerVisible(false)}
          />
        </>
      )}
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
  image: {
    width: 200,
    height: 100,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
  },
});
