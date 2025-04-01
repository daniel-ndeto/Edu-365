import styled from "styled-components";
import { Button } from "@mui/material";

// Container for buttons, centers them on the page
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Red button style
export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    // Hover effect
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;
// Black button style
export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    // Hover effect
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`; 
// Dark red button style
export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    // Hover effect
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`; 
// Blue button style
export const BlueButton = styled(Button)`
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;
// Purple button style
export const PurpleButton = styled(Button)`
  && {
    background-color: #270843;
    color: #fff;
    // Hover effect
    &:hover {
      background-color: #3f1068;
    }
  }
`;

export const DarkBlueButton = styled(Button)`
  && {
    background-color: #000693;
    color: #fff;
    // Hover effect
    &:hover {
      background-color: #07005b;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #133104;
    color: #fff;
    // Hover effect
    &:hover {
      background-color: #266810;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    // Hover effect
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;
// Indigo button style
export const IndigoButton = styled(Button)`
  && {
    background-color: #2f2b80;
    color: white;
    // Hover effect
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;
