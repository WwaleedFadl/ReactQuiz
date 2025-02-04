/* eslint-disable react/jsx-key */

import Options from './Options';

/* eslint-disable react/prop-types */
function Question({ question, dispatch, answer }) {
	return (
		<div>
			<h4>{question.question}</h4>
			<Options
				question={question}
				dispatch={dispatch}
				answer={answer}
			/>
		</div>
	);
}

export default Question;
