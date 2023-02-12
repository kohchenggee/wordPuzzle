import { StatusBar } from "expo-status-bar";
import { StyleSheet,  View } from "react-native";
import { useSelector, Provider } from "react-redux";
import { NAVIGATE_PAGE } from "./redux/reducers/pageReducers";
import Introduction from "./pages/Introduction";
import Game from "./pages/Game";
import Result from "./pages/Result";
import LeaderBoard from "./pages/LeaderBoard";
import { store } from "./redux/store";

function App() {
  const page = useSelector((state) => state.pageCount.page);
  const renderPage = () => {
    switch (page) {
      case NAVIGATE_PAGE.main:
        return <Introduction />;
      case NAVIGATE_PAGE.game:
        return <Game />;
      case NAVIGATE_PAGE.result:
        return <Result />;
      case NAVIGATE_PAGE.leaderBoard:
        return <LeaderBoard />;
      default:
        return <Introduction />;
    }
  };
  return <View style={styles.container}>{renderPage()} <StatusBar style="auto" /></View>;
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
