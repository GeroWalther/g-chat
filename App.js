import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "./Constants/Colors";
import Navigator from "./src/navigation/index";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  useEffect(() => {
    const syncUser = async () => {
      //get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      //quiery the database using Auth userId (sub)
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      if (userData.data.getUser) {
        console.log("User already exists in DB");

        return;
      }
      //if no user in DB, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.phone_number,
        status: "Hey, I am using g-chat!",
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    };
    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary50,
    justifyContent: "center",
  },
});

export default withAuthenticator(App);
