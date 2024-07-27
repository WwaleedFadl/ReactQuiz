/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import RestartButton from './RestartButton';
import './finishedScreen.css';
function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
	const percentage = (points / maxPossiblePoints) * 100;
	let emoji;
	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🎉';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';
	return (
		<div>
			<div className='ifreame-div'>
				<iframe
					src='https://giphy.com/embed/l0Iy4egmDffnOWnsI'
					width='100%'
					height='100%'
					frameBorder='0'
					className='giphy-embed'
					allowFullScreen></iframe>
			</div>

			<p className='text result'>
				<span>{emoji}</span>
				Your scored <strong> ( {points} ) </strong> out of {maxPossiblePoints} ({' '}
				{Math.ceil(percentage)}% )
			</p>
			<p className='highscore'>(Highscore: {highScore} points)</p>
			<RestartButton dispatch={dispatch} />
		</div>
	);
}

export default FinishScreen;
