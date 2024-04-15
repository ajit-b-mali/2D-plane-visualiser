import { initializeApp } from "./initializeApp.js";

const board = document.getElementById("board");
const cursor = document.getElementById("cursor");
const shape = document.getElementById("shape");
const temp = document.getElementById("temp");
const mainScreenEl = document.getElementById("screen");

const app = initializeApp({ board, cursor, shape, temp }, mainScreenEl);

export default app;