import React from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import PersonalizationPage from "./pages/PersonalizationPage";

//TODO: Replace react logos with SoulMatch logos
class App extends React.Component {

  render() {
    //TODO: Implement react router and routing to pages instead of only the login/register page
    return (<PersonalizationPage />)
  }
}

export default App;
