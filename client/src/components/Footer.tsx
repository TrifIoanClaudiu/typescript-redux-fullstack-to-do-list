import { FC } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Footer: FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <StyledFooter>
      <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f0f0f0;
  text-align: center;
  padding: 10px 0;
  z-index: 100; /* Set a higher z-index value */
`;

const LogoutButton = styled.span`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

export default Footer;
