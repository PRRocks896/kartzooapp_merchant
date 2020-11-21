import React from 'react';

class FavouriteCharts extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel ms-widget ms-crypto-widget">
                    <div className="ms-panel-header">
                        <h6>Favourite charts</h6>
                    </div>
                    <div className="ms-panel-body p-0">
                        <ul className="nav nav-tabs nav-justified has-gap px-4 pt-4" role="tablist">
                            <li role="presentation" className="fs-12"><a href="#btc" aria-controls="btc" className="active show" role="tab" data-toggle="tab"> Mon </a></li>
                            <li role="presentation" className="fs-12"><a href="#xrp" aria-controls="xrp" role="tab" data-toggle="tab"> Tue </a></li>
                            <li role="presentation" className="fs-12"><a href="#ltc" aria-controls="ltc" role="tab" data-toggle="tab"> Wed </a></li>
                            <li role="presentation" className="fs-12"><a href="#eth" aria-controls="eth" role="tab" data-toggle="tab"> Thu </a></li>
                            <li role="presentation" className="fs-12"><a href="#zec" aria-controls="zec" role="tab" data-toggle="tab"> Fri </a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active show fade in" id="btc">
                                <div className="table-responsive">
                                    <table className="table table-hover thead-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Restaurant Names</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hunger House</td>
                                                <td>8528</td>
                                                <td className="ms-text-success">+17.24%</td>
                                                <td>7.65%</td>
                                            </tr>
                                            <tr>
                                                <td>Food Lounge</td>
                                                <td>4867</td>
                                                <td className="ms-text-danger">-12.24%</td>
                                                <td>9.12%</td>
                                            </tr>
                                            <tr>
                                                <td>Delizious</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                            <tr>
                                                <td>Netherfood</td>
                                                <td>1614</td>
                                                <td className="ms-text-danger">-20.75%</td>
                                                <td>12.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Rusmiz</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade" id="xrp">
                                <div className="table-responsive">
                                    <table className="table table-hover thead-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Restaurant Name</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hunger House</td>
                                                <td>8528</td>
                                                <td className="ms-text-success">+17.24%</td>
                                                <td>7.65%</td>
                                            </tr>
                                            <tr>
                                                <td>Food Lounge</td>
                                                <td>4867</td>
                                                <td className="ms-text-danger">-12.24%</td>
                                                <td>9.12%</td>
                                            </tr>
                                            <tr>
                                                <td>Delizious</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                            <tr>
                                                <td>Netherfood</td>
                                                <td>1614</td>
                                                <td className="ms-text-danger">-20.75%</td>
                                                <td>12.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Rusmiz</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade" id="ltc">
                                <div className="table-responsive">
                                    <table className="table table-hover thead-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Restaurant Name</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hunger House</td>
                                                <td>8528</td>
                                                <td className="ms-text-success">+17.24%</td>
                                                <td>7.65%</td>
                                            </tr>
                                            <tr>
                                                <td>Food Lounge</td>
                                                <td>4867</td>
                                                <td className="ms-text-danger">-12.24%</td>
                                                <td>9.12%</td>
                                            </tr>
                                            <tr>
                                                <td>Delizious</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                            <tr>
                                                <td>Netherfood</td>
                                                <td>1614</td>
                                                <td className="ms-text-danger">-20.75%</td>
                                                <td>12.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Rusmiz</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade" id="eth">
                                <div className="table-responsive">
                                    <table className="table table-hover thead-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Restaurant Name</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hunger House</td>
                                                <td>8528</td>
                                                <td className="ms-text-success">+17.24%</td>
                                                <td>7.65%</td>
                                            </tr>
                                            <tr>
                                                <td>Food Lounge</td>
                                                <td>4867</td>
                                                <td className="ms-text-danger">-12.24%</td>
                                                <td>9.12%</td>
                                            </tr>
                                            <tr>
                                                <td>Delizious</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                            <tr>
                                                <td>Netherfood</td>
                                                <td>1614</td>
                                                <td className="ms-text-danger">-20.75%</td>
                                                <td>12.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Rusmiz</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade" id="zec">
                                <div className="table-responsive">
                                    <table className="table table-hover thead-light">
                                        <thead>
                                            <tr>
                                                <th scope="col">Restaurant Name</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Orders</th>
                                                <th scope="col">Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Hunger House</td>
                                                <td>8528</td>
                                                <td className="ms-text-success">+17.24%</td>
                                                <td>7.65%</td>
                                            </tr>
                                            <tr>
                                                <td>Food Lounge</td>
                                                <td>4867</td>
                                                <td className="ms-text-danger">-12.24%</td>
                                                <td>9.12%</td>
                                            </tr>
                                            <tr>
                                                <td>Delizious</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                            <tr>
                                                <td>Netherfood</td>
                                                <td>1614</td>
                                                <td className="ms-text-danger">-20.75%</td>
                                                <td>12.25%</td>
                                            </tr>
                                            <tr>
                                                <td>Rusmiz</td>
                                                <td>7538</td>
                                                <td className="ms-text-success">+32.04%</td>
                                                <td>14.29%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Total Earnings</h6>
                    </div>
                    <div className="ms-panel-body p-0">
                        <div className="ms-quick-stats">
                            <div className="ms-stats-grid">
                                <i className="fa fa-star"></i>
                                <p className="ms-text-dark">$8,033</p>
                                <span>Today</span>
                            </div>
                            <div className="ms-stats-grid">
                                <i className="fa fa-university"></i>
                                <p className="ms-text-dark">$3,039</p>
                                <span>Yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default FavouriteCharts;
