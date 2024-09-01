import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  selectCourse,
  unSelectCourse,
  fetchCourses,
  setCourses,
} from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("courseActionCreators", () => {
  describe("selectCourse", () => {
    it("should return the correct action object", () => {
      const index = 1;
      const expectedAction = {
        type: SELECT_COURSE,
        index,
      };
      expect(selectCourse(index)).toEqual(expectedAction);
    });
  });

  describe("unSelectCourse", () => {
    it("should return the correct action object", () => {
      const index = 1;
      const expectedAction = {
        type: UNSELECT_COURSE,
        index,
      };
      expect(unSelectCourse(index)).toEqual(expectedAction);
    });
  });

  describe("fetchCourses", () => {
    it("should fetch courses and dispatch setCourses action", async () => {
      const store = mockStore({});
      const mockCourses = [
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
        { id: 3, name: "Course 3" },
      ];

      // Mock the fetch API
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCourses),
        })
      );

      await store.dispatch(fetchCourses());

      const actions = store.getActions();
      expect(actions[0]).toEqual(setCourses(mockCourses));
      expect(global.fetch).toHaveBeenCalledWith("/dist/courses.json");
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
