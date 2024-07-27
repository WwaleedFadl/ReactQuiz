import { createContext, useContext, useReducer, useEffect } from 'react';
const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
	question: [],
};
