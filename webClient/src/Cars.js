import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { stripTrailingSlash } from './utils.js'


const CAR_PATH = '/cars';

class Cars extends Component {
    constructor(props) {

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            carList: []
        };

        this.ACCOUNTS_PATH = `${props.pluginBaseUri}/accounts`;
    }

    componentWillReceiveProps(props) {
        const { match } = this.props;

        console.log(match);
        console.log(props.match);

        if (props.match !== match) {
            console.log('did not match');
            this.fetchAccountData(props.match.params.accountId);
        }
    }

    componentDidMount() {
        const id = this.props.match.params.accountId;
        this.fetchAccountCarData(id)
    }

    fetchAccountCarData(id) {
        fetch(`${this.ACCOUNTS_PATH}/${id}${CAR_PATH}`)
            .then(async (res) => {
                let resp = await res.json();
                return resp;
            }
            )
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        carList: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }



    render() {
        const { error, isLoaded, carList } = this.state;
        const { match } = this.props;
        const url = stripTrailingSlash(match.url);

        if (error) {
            return (<div>Error: {error.message}</div>);
        } else if (!isLoaded) {
            return (<div>Loading...</div>);
        } else {

            return (
                <section className="cars-section">
                    <h1>Cars</h1>
                    <ul>

                        {carList.length > 0 && carList.map(car => {
                            const { _id, Name, Year, Origin } = car;

                            return (
                                <li key={_id}>
                                    <div>
                                        <b>Car Name:</b>
                                        <Link to={`${url}${CAR_PATH}/${_id}`}>
                                            <span>{Name} </span>
                                        </Link>
                                    </div>
                                    <div>
                                        <b>Year:</b>{Year}
                                    </div>
                                    <div>
                                        <b>Origin:</b>{Origin}
                                    </div>

                                </li>
                            )
                        }
                        )} {carList.length === 0 && <h3>No cars!</h3>}
                    </ul>
                </section>)
        }

    }
}


export default Cars;