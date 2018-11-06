import React from "react";
import { connect } from "react-redux";
import { AppState } from "../reducers";
import { Station } from "../models/station";
import { fetch as fetchStations } from "../actions/stations";

interface StationsStateProps {
    stations: Station[];
}

interface StationsDispatchProps {
    fetchStations: typeof fetchStations;
}

class Stations extends React.Component<StationsStateProps & StationsDispatchProps> {
    componentWillMount(){
        this.props.fetchStations();
    }

    render(){
        return (<div>
            <h1>Bysykkel stasjoner</h1>
                <ul>
                    {this.props.stations.map((station => <li key={station.id}>{station.title}</li>))}
                </ul>
            </div>)
    }
}

const mapStateToProps = (state: AppState): StationsStateProps => (
    {stations: state.stations}
);

export default connect(mapStateToProps, {
    fetchStations
})(Stations);