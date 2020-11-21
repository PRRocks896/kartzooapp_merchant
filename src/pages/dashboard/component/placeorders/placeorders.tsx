import React from 'react';

class PlaceOrders extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Recently Placed Orders</h6>
                    </div>
                    <div className="ms-panel-body">
                        <div className="table-responsive">
                            <table className="table table-hover thead-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Order Name</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Delivered Time</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>French Fries</td>
                                        <td>Jhon Leo</td>
                                        <td>New Town</td>
                                        <td><span className="badge badge-primary">Pending</span>
                                        </td>
                                        <td>10:05</td>
                                        <td>$10</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Mango Pie</td>
                                        <td>Kristien</td>
                                        <td>Old Town</td>
                                        <td><span className="badge badge-dark">Cancelled</span>
                                        </td>
                                        <td>14:05</td>
                                        <td>$9</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>FrieD Egg Sandwich</td>
                                        <td>Jack Suit</td>
                                        <td>Oxford Street</td>
                                        <td><span className="badge badge-success">Delivered</span>
                                        </td>
                                        <td>12:05</td>
                                        <td>$19</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Lemon Yogurt Parfait</td>
                                        <td>Alesdro Guitto</td>
                                        <td>Church hill</td>
                                        <td><span className="badge badge-success">Delivered</span>
                                        </td>
                                        <td>12:05</td>
                                        <td>$18</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Spicy Grill Sandwich</td>
                                        <td>Jacob Sahwny</td>
                                        <td>palace Road</td>
                                        <td><span className="badge badge-success">Delivered</span>
                                        </td>
                                        <td>12:05</td>
                                        <td>$21</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">6</th>
                                        <td>Chicken Sandwich</td>
                                        <td>Peter Gill</td>
                                        <td>Street 21</td>
                                        <td><span className="badge badge-primary">Pending</span>
                                        </td>
                                        <td>12:05</td>
                                        <td>$15</td>
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

export default PlaceOrders;
