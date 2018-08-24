import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Icon } from 'modules/common/components';
import { AuthBox } from '../styles';

const propTypes = {
  login: PropTypes.func.isRequired
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.login = this.login.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  login(e) {
    e.preventDefault();

    const { email, password } = this.state;

    this.props.login({ email, password });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  render() {
    const { __ } = this.context;
    return (
      <AuthBox>
        <h2>{__('Sign in')}</h2>
        <form onSubmit={this.login}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button disabled>
                  <Icon icon="user" />
                </Button>
              </InputGroup.Button>
              <FormControl
                type="email"
                placeholder={__('demo@erxes.io')}
                required
                onChange={this.handleEmailChange}
                onFocus={this.handleOnFocus}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button disabled>
                  <Icon icon="padlock-1" />
                </Button>
              </InputGroup.Button>
              <FormControl
                type="password"
                placeholder="demo"
                required
                onChange={this.handlePasswordChange}
              />
            </InputGroup>
          </FormGroup>
          <Button btnStyle="success" type="submit" block>
            Sign in
          </Button>
        </form>
      </AuthBox>
    );
  }
}

SignIn.propTypes = propTypes;
SignIn.contextTypes = {
  __: PropTypes.func
};

export default SignIn;
