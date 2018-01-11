import React from 'react';
import markerIcon from '../assets/images/marker.png';
import polylineIcon from '../assets/images/polyline.png';

class Control extends React.Component {
	render() {
		return (
			<div className='control'>
				<div className="buttonBackground" onClick={() => this.props.onclick('polyline')}>
					<img src={markerIcon} alt='markerIcon' className='markerIcon'/>
				</div>
				<div className="buttonBackground polylineBackground" onClick={() => this.props.onclick('waypoints')}>
					<img src={polylineIcon} alt='polylineIcon' className='polylineIcon'/>
				</div>
			</div>
		)
	}
}
export default Control;
