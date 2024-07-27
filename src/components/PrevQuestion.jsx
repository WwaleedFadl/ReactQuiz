/* eslint-disable react/prop-types */
function PrevQuestion({ dispatch }) {
	return (
		<button
			className='btn btn-left'
			onClick={() => {
				dispatch({ type: 'previousQuestion' });
			}}>
			Previous
		</button>
	);
}

export default PrevQuestion;
