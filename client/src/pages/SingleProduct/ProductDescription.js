import React, { useState } from "react";
import styled from "styled-components";

const DescContainer = styled.div`
  margin: 20px 0px;
`;

const DescText = styled.p`
  line-height: 1.6;
  color: #666;
  margin-bottom: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductDescription = ({ description = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = description.length > maxLength && !isExpanded 
    ? `${description.slice(0, maxLength)}...` 
    : description;

  return (
    <DescContainer>
      <DescText>{displayText}</DescText>
      {description.length > maxLength && (
        <ToggleButton onClick={toggleDescription}>
          {isExpanded ? "Show Less" : "More"}
        </ToggleButton>
      )}
    </DescContainer>
  );
};

export default ProductDescription;
