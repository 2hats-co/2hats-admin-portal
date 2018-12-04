import React from "react";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthenticationContainer from "../containers/AuthenticationContainer";
import LoadingCard from "../components/LoadingCard";
import { COLLECTIONS } from "../constants/firestore";
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadData();
    if (this.props.authUser == !null) {
      this.props.history.push(ROUTES.stats);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props;
    if (user !== prevProps.user) {
      if (user[0].defaultRoute) {
        this.props.history.push(user[0].defaultRoute);
      } else {
        this.props.history.push("/statistics");
      }
    }
    if (!prevProps.uid && this.props.uid) {
      this.props.loadData();
    }
  }
  render() {
    if (this.props.authUser) {
      const { displayName } = this.props.authUser;
      const firstName = displayName.split(" ")[0];
      return (
        <LoadingCard
          message={`${firstName} you're appreciated 🤗`}
          width={350}
          height={260}
        />
      );
    } else {
      return <AuthenticationContainer />;
    }
  }
}

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => () => {
      if (props.uid) {
        const adminListenerSettings = {
          collection: COLLECTIONS.admins,
          doc: props.uid,
          storeAs: "adminUser"
        };
        props.firestore.setListener(adminListenerSettings);
      }
    }
  }),
  connect(({ firestore }) => ({
    user: firestore.ordered.adminUser // document data by id
  }))
);

export default withRouter(enhance(compose(Landing)));
