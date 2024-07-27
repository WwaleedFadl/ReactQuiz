/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
function StartScreen({ numQuestions, dispatch }) {
	return (
		<div className='start'>
			<h2>Welcome to React Quiz!</h2>
			<h3> {numQuestions} Questions to test your React mastery</h3>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'start' })}>
				Lets start
			</button>
		</div>
	);
}

export default StartScreen;
