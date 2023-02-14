import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { QUESTIONS } from "../constant";
import { navigatePage, NAVIGATE_PAGE } from "../redux/reducers/pageReducers";

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const ShowResult = ({ correct, incorrect }) => {
  return (
    <View>
      {correct && (
        <View>
          <Text style={styles.correctLabel}>Correct!</Text>
        </View>
      )}
      {incorrect && (
        <View>
          <Text style={styles.incorrectLabel}>Incorrect!</Text>
        </View>
      )}
    </View>
  );
};

const Game = () => {
  const [score, setScore] = useState(0);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const questionList = useSelector((state) => state.pageCount.questionList);
  const [list, setList] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const length = list?.[questionNumber]?.ans.length;
  const dispatch = useDispatch();

  const nextQuestion = async (newScore) => {
    const newQuestionNumber = questionNumber + 1;
    if (newQuestionNumber > 2) {
      dispatch(navigatePage({ page: NAVIGATE_PAGE.result, score: newScore }));
      return;
    }
    setQuestionNumber(newQuestionNumber);
    setAnswerList([]);
    setSelectionList(shuffleArray([...list?.[newQuestionNumber]?.ans]));
    setAnswerIndex(0);
  };

  const selectionOnClick = (index) => {
    const newList = [...answerList];
    newList.push(selectionList[index]);
    selectionList.splice(index, 1);

    setAnswerList(newList);
    setAnswerIndex(answerIndex + 1);
    if (selectionList.length > 0) {
      return;
    }
    let newScore = score;
    if (newList.join("") === list?.[questionNumber]?.ans) {
      newScore = score + 10;
      setScore(newScore);
      setShowCorrect(true);
    } else {
      setShowIncorrect(true);
    }
    setTimeout(() => {
      setShowCorrect(false);
      setShowIncorrect(false);
      nextQuestion(newScore);
    }, 2000);
  };

  useEffect(() => {
    const newList = shuffleArray(QUESTIONS?.[questionList]);
    setList(newList);
    setSelectionList(shuffleArray([...newList?.[questionNumber]?.ans]));
  }, []);

  const renderSelection = () => {
    let listArray = [];
    for (let i = 0; i < selectionList.length; i++) {
      listArray.push(
        <TouchableOpacity
          onPress={() => {
            selectionOnClick(i);
          }}
          key={`selection_button${i}`}
        >
          <View style={styles.listItem}>
            <Text style={styles.listItemLabel}>{selectionList[i]}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.listContainer}>{listArray.map((item) => item)}</View>
    );
  };
  const answerOnClick = (index) => {
    const newList = [...answerList];
    const item = newList.splice(index, 1);
    selectionList.push(item);
    setAnswerIndex(answerIndex - 1);
    setAnswerList(newList);
  };
  const renderAnswerSelection = () => {
    let listArray = [];
    for (let i = 0; i < length; i++) {
      listArray.push(
        <TouchableOpacity
          disabled={!answerList?.[i]}
          onPress={() => {
            answerOnClick(i);
          }}
          key={`answer_button${i}`}
        >
          <View
            style={[
              styles.listItem,
              answerIndex === i && styles.answeringContainer,
            ]}
          >
            <Text style={styles.listItemLabel}>{answerList[i]}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.listContainer}>{listArray.map((item) => item)}</View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleLabel}>Q{questionNumber + 1} of 3</Text>
      </View>
      {renderAnswerSelection()}
      <View style={styles.hintContainer}>
        {list?.[questionNumber]?.qn && (
          <Text style={styles.hintLabel}>{list?.[questionNumber]?.qn}</Text>
        )}
        {list?.[questionNumber]?.img && (
          <Image
            source={list?.[questionNumber]?.img}
            style={styles.imageStyle}
          />
        )}
      </View>
      {renderSelection()}
      <ShowResult correct={showCorrect} incorrect={showIncorrect} />
      <View style={styles.skipButton}>
        <TouchableOpacity onPress={() => nextQuestion(score)}>
          <Text style={styles.skipLabel}>Skip</Text>
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
  },
  titleLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 300,
    height: 200,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 10,
    height: 50,
    width: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  listItemLabel: {
    textAlign: "center",
  },
  hintContainer: {
    paddingVertical: 20,
  },
  hintLabel: {
    fontSize: 20,
  },
  answeringContainer: {
    backgroundColor: "#6495ed",
  },
  skipButton: {
    width: 200,
    borderRadius: 8,
    backgroundColor: "indigo",
    position: "absolute",
    bottom: 40,
    padding: 10,
  },
  skipLabel: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  correctLabel: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green",
  },
  incorrectLabel: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
  },
});

export default Game;
