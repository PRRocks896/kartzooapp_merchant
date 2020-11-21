import React from 'react';
import './orderrequest.css';


class OrderRequest extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center align-left">
                                <h6>Recent Orders Requested</h6>
                            </div>
                            <button type="button" className="btn btn-primary">View All</button>
                        </div>
                    </div>
                    <div className="ms-panel-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Food Item</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Product ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/pizza.jpg" alt="people" /> Pizza </td>
                                        <td>$19.99</td>
                                        <td>67384917</td>
                                    </tr>
                                    <tr>
                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/french-fries.jpg" alt="people" /> French Fries </td>
                                        <td>$14.59</td>
                                        <td>789393819</td>
                                    </tr>
                                    <tr>
                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/cereals.jpg" alt="people" /> Multigrain Hot Cereal </td>
                                        <td>$25.22</td>
                                        <td>137893137</td>
                                    </tr>
                                    <tr>
                                        <td className="ms-table-f-w"> <img src="./assets/img/costic/egg-sandwich.jpg" alt="people" /> Fried Egg Sandwich </td>
                                        <td>$11.23</td>
                                        <td>235193138</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default OrderRequest;
