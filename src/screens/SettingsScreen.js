import { View, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";

const SettingsScreen = () => {
  function onSigneOut() {
    Auth.signOut();
  }
  return (
    <View style={styles.btnCon}>
      <Button title="Signe Out" onPress={onSigneOut} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  btnCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
