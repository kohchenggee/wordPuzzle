import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backToMainPage } from "../redux/reducers/pageReducers";
import { useDispatch } from "react-redux";

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem("leaderBoard");
        if (valueString !== null) {
          const value = JSON.parse(valueString).slice(0, 9);
          setList(value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleLabel}>LeaderBoard</Text>
      </View>

      <View style={styles.scoreContainer}>
        {list.map((item, index) => (
          <View style={styles.scoreItem} key={`gameScore_${index}`}>
            <View style={styles.scoreSubContainer}>
              <Text style={styles.scoreLabel}>{index + 1}</Text>
              <Image
                style={styles.avatarImg}
                source={require("../assets/avatar.png")}
              />
            </View>
            <View style={styles.scoreSubContainer}>
              {index < 3 && (
                <Image
                  style={styles.crownImg}
                  source={require("../assets/goldBadge.png")}
                />
              )}
              <Text
                style={[
                  styles.scoreLabel,
                  item <= 10 ? styles.lowScore : styles.highScore,
                ]}
              >
                {item}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.backButtonContainer}>
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
  },
  titleContainer: {
    position: "absolute",
    top: 80,
    width: "100%",
    alignItems: "center",
  },
  titleLabel: {
    fontSize: 20,
    padding: 8,
    backgroundColor: "darkorange",
    width: 250,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 8,
    color: "white",
  },
  scoreItem: {
    flexDirection: "row",
    paddingHorizontal: 60,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  scoreLabel: {
    fontSize: 20,
  },
  scoreContainer: {
    flex: 1,
    paddingTop: 120,
    width: "100%",
  },
  lowScore: {
    color: "red",
  },
  highScore: {
    color: "green",
  },
  backButtonContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  backButton: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: "deepskyblue",
  },
  backButtonLabel: { color: "white", fontSize: 20, textAlign: "center" },
  crownImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 8,
  },
  scoreSubContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
});

export default LeaderBoard;
