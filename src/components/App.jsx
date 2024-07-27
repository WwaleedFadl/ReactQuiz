import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import PrevQuestion from './PrevQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

/////////////////----------------------\\\\\\\\\\\\\\\\\\\\\\

const initialState = {
	questions: [],
	// >>> 'loading' >> 'error' >> 'ready' >> 'active' >> 'finished'
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemaining: null,
};
const SECONDS_PER_QUESTION = 30;
/////////////////---------- State Updating ----------\\\\\\\\\\\\\\\\\\\\\\

function reducer(state, action) {
	// console.log(state, action);
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				questions: action.payload,
				status: 'ready',
			};
		case 'dataFailed':
			return {
				...state,
				status: 'error',
			};
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
			};
		case 'newAnswer':
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case 'previousQuestion':
			return {
				...state,
				index: state.index - 1,
				answer: action.payload,
			};
		case 'finish':
			return {
				...state,
				status: 'finished',
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};

		default:
			throw new Error('Action Unknown');
	}
}

/////////////////----------------------\\\\\\\\\\\\\\\\\\\\\\

export default function App() {
	const [
		{ questions, status, index, answer, points, highScore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0,
	);

	useEffect(function () {
		async function fetchData() {
			try {
				const res = await fetch('http://localhost:8000/questions');
				const data = await res.json();
				dispatch({ type: 'dataReceived', payload: data });
			} catch (err) {
				dispatch({ type: 'dataFailed' });
			}
		}
		fetchData();
	}, []);

	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index + 1}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<PrevQuestion
								dispatch={dispatch}
								// answer={answer}
								question={questions[index]}
							/>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<NextButton
								dispatch={dispatch}
								index={index}
								numQuestions={numQuestions}
								answer={answer}
							/>
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
