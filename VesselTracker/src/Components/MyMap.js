import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// solves issues with leaflet.css import
import 'leaflet/dist/leaflet.css';

class MyMap extends React.Component {
	state = {
		coords: [],
		map: null,
		isWaypoints: true,
	}

	componentWillMount = () => {
		this.setState({coords: this.getCoords()});
	}

	// get coords from server resposnse
	getCoords = (data) => {
		let coords = [];
		this.props.data.map((x, i) => {
			return coords.push(this.props.data[i].coords);
		});
		return coords;
	}

	render() {
		return (
			<Map ref={map=>{this.leafletMap = map;}} bounds={this.state.coords} className='map'>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<MarkerClusterGroup>
				</MarkerClusterGroup>
			</Map>
		)
	}
}

export default MyMap;

				
