import logger from "./logger";
import { thunk } from "redux-thunk";
import { Tuple } from "@reduxjs/toolkit";

export default () => new Tuple(thunk, logger);
