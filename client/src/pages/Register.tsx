import styled from "styled-components";
import { FC, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth";
import { isEmail, isPasswordStrong } from "../utils";
import { API_REGISTER_CALL } from "../APICalls";

interface InputProps {
  valid: boolean;
}

const Register : FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value;
    setEmail(value);
    setEmailValid(isEmail(value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const value = event.target.value;
    setPassword(value);
    setPasswordValid(isPasswordStrong(value));
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = {
      password,
      firstName,
      lastName,
      email,
    };
    try {
      await axios.post(`${API_REGISTER_CALL}`, { formData });
      login(dispatch, { email, password });
    } catch (err) {
      console.log(err);
    }
  };

  const buttonDisabled = () => {
    return !(
      emailValid &&
      passwordValid &&
      firstName &&
      lastName &&
      password &&
      email
    );
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE A NEW ACCOUNT</Title>
        <Form>
          <InputWrapper>
            <Input
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First Name"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last Name"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handleEmailChange}
              placeholder="Email"
              valid={emailValid ? true : false}
            />
            {!emailValid && (
              <ErrorMessage>Please enter a valid email address</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handlePasswordChange}
              placeholder="Password"
              type="password"
              valid={passwordValid ? true : false}
            />
            {!passwordValid && (
              <ErrorMessage>
                Password must be at least 8 characters long and contain a
                combination of letters, numbers, and special characters
              </ErrorMessage>
            )}
          </InputWrapper>
          <Button onClick={handleClick} disabled={buttonDisabled()}>
            CREATE ACCOUNT
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.finestwallpaper.com/uploads/5/7/7/9/5779447/s774058804322417752_p1199_i9_w640.jpeg")
      no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 50px 0px 0px;
  position: relative;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  border: ${({ valid }) => (valid ? "1px solid #ccc" : "1px solid red")};
  color: ${({ valid }) => (valid ? "#333" : "red")};
`;

const ErrorMessage = styled.span`
  visibility: hidden;
  background-color: red;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  ${InputWrapper}:hover & {
    visibility: visible;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 10px;
  padding: 15px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "teal")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "darkcyan")};
  }
`;

export default Register;
