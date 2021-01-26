import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { Form, Row, Button, Alert, Col } from "react-bootstrap";
import { Login } from "../../../redux/crisislogger/thunks/auth.thunk";
import Utils from "../../../util/Utils";
import "./style.scss";

const utils  = new Utils();
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      signInSuccessful: false,
    };
  }
  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
  };
  render() {
    const { t } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        {this.props.error && (
          <Alert variant={"danger"}> {this.props.error}</Alert>
        )}
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            name="email"
            placeholder={t(utils.getsubDomain() + ".login.emailLabel")}
            onChange={this.changeValue}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="password"
            name="password"
            placeholder={t(utils.getsubDomain() + ".login.passwordLabel")}
            onChange={this.changeValue}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label={t(utils.getsubDomain() + ".login.rememberMe")}
          />
        </Form.Group>
        <Row>
          <Col xl={{ span: 4, offset: 4 }}>
            <Button type="submit">
              {t(utils.getsubDomain() + ".login.button")}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};
const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(Login, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LoginForm));
