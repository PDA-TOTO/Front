import { createTheme } from '@mantine/core';
import './nanumSquareRound.css';

export const theme = createTheme({

  white: "#F6FBFF",
  black: "1E1F22", 

  // Base color index 5
  colors:{ 
    'primary' : ["#e9e9e9","#c9c9ca","#9e9fa0","#717274","#47474a","#1e1f22","#1a1a1d","#151618","#111213","#0d0e0f"],
    'secondary' : ["#fafbfc","#f2f5f7","#e8edf1", "#dde5ea","#d3dde4","#c9d6de", "#abb6bd", "#8f989e", "#737a7f","#5a6064"],
    "gray" : ["#f2f3f3","#e1e1e1","#c9c9ca","#b0b0b1","#989999","#818283","#6e6f6f","#5c5c5d","#4a4a4b","#3a3a3b"],
    "white": ["#feffff","#fdfeff","#fbfdff","#f9fcff","#f8fcff","#f6fbff","#d1d5d9", "#afb2b5","#8c8f91","#6f7173"],
    "block": ["#fefefe","#fbfdfe","#f9fbfc","#f6f9fb","#f3f7fa","#f0f5f9","#ccd0d4","#aaaeb1","#898c8e","#6c6e70"],
    "pink": ["#fcfafa","#f7f2f2","#f1e8e8","#eadddd","#e4d3d3","#dec9c9","#bdabab","#9e8f8f","#7f7373","#645a5a"],
    "blue" : ["#f3f9fc", "#e3f1f9", "#cde5f4","#b6d9ef","#a0ceea","#8bc3e5","#76a6c3","#638aa3","#4f6f83","#3f5867"],
    "red": ["#fcf4f4","#f8e3e3","#f3cece","#edb7b7","#e7a1a1","#e28c8c","#c07777","#a06363","#815050","#663f3f"]
  },

  fontFamily: 'nanumSquareRound',

  headings:{
    fontFamily: 'nanumSquareRound',
  },

  defaultRadius: "10px",
  cursorType: "pointer",
})