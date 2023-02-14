import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { navigatePage, NAVIGATE_PAGE } from "../redux/reducers/pageReducers";
import { TOPICS } from "../constant";

const Introduction = () => {
  const dispatch = useDispatch();
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleButton}>Word Puzzle</Text>
      </View>
      <View style={styles.sectionContainer}>
        {TOPICS.map((item, index) => (
          <View
            style={[
              styles.questionButton,
              selectedSection === item.key && styles.selectedQuestion,
            ]}
            key={`question_${index}`}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedSection(item.key);
              }}
            >
              <Text
                style={[
                  styles.questionLabel,
                  selectedSection === item.key && styles.selectedQuestionLabel,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <View
          style={[
            styles.startButton,
            selectedSection == null && styles.disableButton,
          ]}
        >
          <TouchableOpacity
            disabled={selectedSection == null}
            onPress={() =>
              dispatch(
                navigatePage({
                  page: NAVIGATE_PAGE.game,
                  questionList: selectedSection,
                })
              )
            }
          >
            <Text style={styles.startLabel}>Start</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(navigatePage({ page: NAVIGATE_PAGE.leaderBoard }));
          }}
        >
          <View style={styles.leaderBoardButton}>
            <Image
              style={styles.trophyImage}
              source={require("../assets/trophy.png")}
            />
            <Text style={styles.leaderBoard}>Leaders Board</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6495ed",
  },
  titleContainer: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  titleButton: {
    fontSize: 20,
    padding: 8,
    backgroundColor: "darkorange",
    width: 250,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 8,
    color: "white",
  },
  questionButton: {
    padding: 20,
    backgroundColor: "white",
    borderWidth: 1,
    margin: 20,
    borderRadius: 8,
    textAlign: "center",
    width: 250,
    alignSelf: "center",
    borderColor: "white",
  },
  selectedQuestion: {
    backgroundColor: "#f5f5dc",
  },
  selectedQuestionLabel: {
    fontWeight: "bold",
  },
  questionLabel: { fontSize: 20, color: "purple", textAlign: "center" },
  startButton: {
    padding: 20,
    backgroundColor: "green",
    margin: 20,
    borderRadius: 8,
    width: 250,
    alignSelf: "center",
  },
  disableButton: { backgroundColor: "grey" },
  startLabel: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  sectionContainer: {
    paddingTop: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leaderBoardButton: {
    padding: 20,
    marginTop: 30,
    width: 250,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  trophyImage: {
    height: 40,
    width: 40,
    marginRight: 8,
  },
  leaderBoard: {
    textAlign: "center",
    color: "orange",
    fontSize: 20,
  },
});

export default Introduction;
