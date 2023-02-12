import renderer from "react-test-renderer";
import Introduction from "../pages/Introduction";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { NAVIGATE_PAGE } from "../redux/reducers/pageReducers";

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("<Introduction />", () => {
  const initialState = { page: NAVIGATE_PAGE.main };
  const mockStore = configureStore();
  let store;
  it("has 2 children", () => {
    store = mockStore(initialState);
    const tree = renderer.create(<Provider store={store}><Introduction /></Provider>).toJSON();
    expect(tree.children.length).toBe(2);
  });
  it("renders correctly", () => {
    store = mockStore(initialState);
    const tree = renderer.create(<Provider store={store}><Introduction /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
