import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { NAVIGATE_PAGE } from "../redux/reducers/pageReducers";
import LeaderBoard from "../pages/LeaderBoard";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("<LeaderBoard />", () => {
  const initialState = { page: NAVIGATE_PAGE.leaderBoard };
  const mockStore = configureStore();
  let store;
  beforeEach(async () => {
    await AsyncStorage.setItem("leaderBoard", JSON.stringify([30, 20]));
  });

  it("has 3 children", () => {
    store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(3);
  });
  it("check with Asyncstorage is called", async () => {
    store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <LeaderBoard />
        </Provider>
      )
      .toJSON();
    expect(await AsyncStorage.getItem).toBeCalledWith("leaderBoard");
  });
});
