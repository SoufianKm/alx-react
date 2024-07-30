  it("renders 5 different rows", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("thead").children()).toHaveLength(2);
    wrapper.find("thead").forEach((node) => {
      expect(node.equals(<CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />));
    });

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).html()).toEqual("<tr><td>ES6</td><td>60</td></tr>");
    expect(wrapper.find("tbody").childAt(1).html()).toEqual("<tr><td>Webpack</td><td>20</td></tr>");
    expect(wrapper.find("tbody").childAt(2).html()).toEqual("<tr><td>React</td><td>40</td></tr>");
  });

  it("renders correctely when passed a list of courses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).html()).toEqual("<tr><td>ES6</td><td>60</td></tr>");
    expect(wrapper.find("tbody").childAt(1).html()).toEqual("<tr><td>Webpack</td><td>20</td></tr>");
    expect(wrapper.find("tbody").childAt(2).html()).toEqual("<tr><td>React</td><td>40</td></tr>");
  });