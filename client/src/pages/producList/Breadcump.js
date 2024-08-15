import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";

const BreadcrumbContainer = styled.div`
  margin: 20px 0 0 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: gray;
  ${mobile({ margin: "10px 20px", fontSize: "12px" })}
`;

const Crumb = styled.span`
  margin-right: 8px;
  &:not(:last-child)::after {
    content: "/";
    margin-left: 8px;
  }
`;

const Breadcrumb = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part);

  return (
    <BreadcrumbContainer>
      <Crumb>
        <Link to="/" style={{textDecoration: "none", color: "black"}}>Home</Link>
      </Crumb>
      {pathParts.map((part, index) => {
        const path = `/${pathParts.slice(0, index + 1).join("/")}`;
        return (
          <Crumb key={index}>
            <Link to={path}style={{textDecoration: "none", color: "black"}}>{part}</Link>
          </Crumb>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
