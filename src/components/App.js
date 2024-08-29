import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { withRouter } from "../utils/helpers";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { handleInitialData } from "../actions/shared";
import PollPage from "./PollPage";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className="container">
        {props.pathName !== "/" && <Nav />}
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/question/:id" exact element={<PollPage />} />
          <Route path="/add" exact element={<NewQuestion />} />
          <Route path="/leaderboard" exact element={<LeaderBoard />} />
        </Routes>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ users }, props) => {
  const pathName = props.router.location.pathname;
  return {
    loading: users === null,
    pathName,
  };
};

export default withRouter(connect(mapStateToProps)(App));
