import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Form, Row, Button, Alert, Col } from 'react-bootstrap';
import { Register } from '../../../redux/crisislogger/thunks/auth.thunk'
import Utils from "../../../util/Utils";

const utils  = new Utils();
class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           email: '',
           password: '',
           confirmPassword: '',
           username: '',
           passwordConfirmError: false,
           passwordLength: false,
           referral_code: '',
        }
    }
    changeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        let { username, password,  email, passwordConfirmError, passwordLength, referral_code } = this.state
        if(!passwordConfirmError && !passwordLength) {
            let upload_id = null;
            if(localStorage.getItem('upload_id'))
            {
                upload_id = localStorage.getItem('upload_id')
            }
            this.props.register({ name:username, password,
                email, role: 1,
                upload_id: upload_id,
                referral_code: referral_code,
                where_from: utils.getCurrentDomain()
            })
        }
    }

    onChangePassword  = (e) => {
        if(e.target.value.length < 6) {
            this.setState({ passwordLength: true })
        } else {
            this.setState({ passwordLength: false })  
        }

        this.setState({ [e.target.name]: e.target.value})
    }

    validationConfirmPassword = (event) => {
        if(this.state.password !== event.target.value) {
            this.setState({ passwordConfirmError: true })
        } else {
            this.setState({ passwordConfirmError: false })
        }
    }

    gotoSkip= () => {
        this.props.history.push('/')
    }
    render() {
        const { t } = this.props
        const { passwordConfirmError, passwordLength } = this.state
        return (
            <Form onSubmit={this.onSubmit}>
                 { this.props.error &&  <Alert variant={'danger'}> {this.props.error}</Alert>}
                <Form.Group controlId="formBasicEmail">
                <Form.Label>{t(utils.getsubDomain()+".register.emailLabel")}</Form.Label>
                    <Form.Control required type="email" name="email" placeholder={t(utils.getsubDomain()+".register.emailLabel")} onChange={this.changeValue} />
                </Form.Group>
                 <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t(utils.getsubDomain()+".register.usernameLabel")}</Form.Label>
                    <Form.Control required type="text" name="username" placeholder={t(utils.getsubDomain()+".register.usernameLabel")} onChange={this.changeValue} />
                </Form.Group>
               
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t(utils.getsubDomain()+".register.passwordLabel")}</Form.Label>
                    <Form.Control 
                        required 
                        type="password" 
                        name="password" 
                        placeholder={t(utils.getsubDomain()+".register.passwordLabel")}
                        onChange={this.onChangePassword}
                        isInvalid={this.state.passwordLength}
                    />
                    <Form.Control.Feedback type="invalid">
                        Must be at least 6 characters
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label >{t(utils.getsubDomain()+".register.passwordConfirmLabel")}</Form.Label>
                    <Form.Control 
                        required 
                        type="password" 
                        name="confirmPassword"
                        onBlur={this.validationConfirmPassword}
                        placeholder={t(utils.getsubDomain()+".register.passwordConfirmLabel")}
                        onChange={this.changeValue}
                        isInvalid={!!this.state.passwordConfirmError}
                    />
                    <Form.Control.Feedback type="invalid">
                        The password confirmation does not match
                    </Form.Control.Feedback>
                </Form.Group>
                {
                  !utils.isSubdomain() &&
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label >{'Referral Code (if you were given one)'}</Form.Label>
                    <Form.Control  type="text" name="referral_code" placeholder={'Referral code'} onChange={this.changeValue} />
                  </Form.Group>
                }
                <Form.Group>
                    <Form.Check type="checkbox" label={t(utils.getsubDomain()+".register.rememberMe")} />
                </Form.Group>
                <Row>
                    <Col >
                        <Button type="submit" variant={'success'} disabled={passwordConfirmError || passwordLength} >{t(utils.getsubDomain()+".register.button")}</Button>
                     
                    </Col >
                    <Col >
                        <Button  variant={'outline-primary'} onClick={this.gotoSkip}>{'Skip'}</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: bindActionCreators(Register, dispatch)
})
const mapStateToProps = state => {
    return {
      user: state.user.user,
      loading: state.user.loading,
      loaded: state.user.loaded,
      error: state.user.error
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RegisterForm))