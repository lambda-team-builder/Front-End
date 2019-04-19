import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles";

const DropdownSearch = ({
  placeholder,
  values,
  onClick,
  max,
  close,
  height
}) => {
  const [filter, setFilter] = useState("");
  return (
    <Container resultsHeight={height}>
      {close && <button onClick={close}>&times;</button>}
      <input
        onChange={e => setFilter(e.target.value)}
        type="text"
        placeholder={placeholder}
        value={filter}
        required
      />
      <div className="values">
        {values
          .map((v, i) => [v, i])
          .filter(([v]) => v.toLowerCase().includes(filter.toLowerCase()))
          .slice(0, max || values.length)
          .map(([v, i]) => (
            <div key={i} onClick={() => onClick(i)}>
              {v}
            </div>
          ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: inline-block;
  input:focus + .values,
  input:valid + .values,
  .values:hover,
  .values:focus {
    visibility: visible;
  }
  input {
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 5px;
  }
  input:invalid {
    drop-shadow: none;
  }
  .values {
    visibility: hidden;
    position: absolute;
    z-index: 11;
    top: 100%;
    width: 100%;
    cursor: pointer;
    border: 1px solid lightgrey;
    box-sizing: border-box;
    max-height: ${props => props.resultsHeight || "auto"};
    overflow-y: auto;
    div {
      background: ${colors.white};
      border: 1px solid ${colors.turbulence};
      box-sizing: border-box;
      padding: 5px;
      transition: background 0.3s;
      &:hover {
        background: ${colors.turbulence};
      }
    }
  }
  button {
    position: absolute;
    right: 5px;
    border: none;
    height: 70%;
    top: 15%;
    font-weight: bold;
    color: lightgrey;
    background: transparent;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 10;
    &:hover {
      color: ${colors.thunderhead};
    }
  }
`;

export default DropdownSearch;
