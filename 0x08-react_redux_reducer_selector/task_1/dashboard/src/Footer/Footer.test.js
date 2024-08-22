import { shallow } from "enzyme";
import React from "react";
import Footer from "./Footer";
import { getFullYear, getFooterCopy } from "../utils/utils";

describe("<Footer />", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toEqual(true);
  });
  it("should render the text Copyright", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toEqual(
      `Copyright ${getFullYear()} - ${getFooterCopy()}`
    );
  });

  it("renders the text “Copyright” when context is set to:(user defined, isLoggedIn is false and an email is set)", () => {
    const wrapper = mount(
      <AppContext.Provider value={{ currentUser: user, logOut: logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find("p").text()).toContain("Copyright");
  });

  it('renders the text "Contact us" when context is set to:( user defined, isLoggedIn is true and an email is set)', () => {
    user.isLoggedIn = true;
    const wrapper = mount(
      <AppContext.Provider value={{ currentUser: user, logOut: logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find("p").text()).toContain("Contact us");
  });
});
