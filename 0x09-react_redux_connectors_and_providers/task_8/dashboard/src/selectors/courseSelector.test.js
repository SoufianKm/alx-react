import { fromJS } from "immutable";
import { selectAllCourses } from "./courseSelector";

describe("selectAllCourses", () => {
  it("should return all course entities as a List", () => {
    const initialState = fromJS({
      courses: {
        1: { id: 1, name: "Course 1" },
        2: { id: 2, name: "Course 2" },
        3: { id: 3, name: "Course 3" },
      },
    });

    const result = selectAllCourses(initialState);
    const expected = fromJS([
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
      { id: 3, name: "Course 3" },
    ]);

    expect(result).toEqual(expected);
  });
});
