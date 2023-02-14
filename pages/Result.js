import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { backToMainPage } from "../redux/reducers/pageReducers";

const Result = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.pageCount.score);

  useEffect(() => {
    const storeData = async () => {
      try {
        const valueString = await AsyncStorage.getItem("leaderBoard");
        if (valueString !== null) {
          const value = JSON.parse(valueString);
          AsyncStorage.setItem(
            "leaderBoard",
            JSON.stringify([...value, score].sort().reverse().slice(0, 9))
          );
        } else {
          AsyncStorage.setItem("leaderBoard", JSON.stringify([score]));
        }
      } catch (error) {
        console.log(error);
      }
    };

    storeData();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hi i have score ${score} points in wordPuzzle, come join the fun`,
      });
      if (result.action === Share.sharedAction) {
        Alert.alert("Message Shared");
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Message Shared Failed");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/thumbsup.png")}
      />
      <Text style={styles.scoreLabel}>Congratulations</Text>
      <Text style={styles.scoreSubLabel}>You have earn a total score </Text>
      <Text style={[styles.scoreLabel, styles.scorePoint]}>{score}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onShare}>
          <View style={styles.shareButton}>
            <Text style={styles.shareLabel}>Share your score</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => dispatch(backToMainPage())}>
          <View style={styles.backButton}>
            <Text style={styles.backButtonLabel}>Back to Main Menu</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  shareButton: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  shareLabel: { color: "blue", textAlign: "center", fontSize: 20 },
  scoreLabel: { textAlign: "center", fontSize: 30, fontWeight: "bold" },
  imageStyle: { width: 200, height: 200, resizeMode: "contain" },
  backButton: { padding: 20, borderRadius: 8, backgroundColor: "deepskyblue" },
  backButtonLabel: { color: "white", fontSize: 20, textAlign: "center" },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
  },
  scoreSubLabel: {
    fontSize: 20,
  },
  scorePoint: {
    fontSize: 40,
  },
});
export default Result;
