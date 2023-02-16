import React from "react";

import AuthenticationPage from "./pages/AuthenticationPage";
import './App.css';

function App00() {
    return (
        <div className='App'>
        <h1>hello</h1>
        </div>

    )

}
//TODO: Replace react logos with SoulMatch logos
class App extends React.Component {

  render() {
    //TODO: Implement react router and routing to pages instead of only the login/register page
    return (<AuthenticationPage />)
  }
}
App00();
export default App;
