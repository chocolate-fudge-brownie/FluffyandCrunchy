import React from 'react'
import { connect } from 'react-redux';
import { setOrder } from '../store/singleOrder';

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        this.setState({ isLoading: false });
    }
    render() {
        console.log(this.props.order);
        return (
            <div>
                
            </div>
        )
    }
}
const mapState = (state) => ({
    order: state.singleOrder
});

export default connect(mapState, null)(Details);
