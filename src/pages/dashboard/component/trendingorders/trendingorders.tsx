import React from 'react';

class TrendingOrders extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Trending Orders</h6>
                    </div>
                    <div className="ms-panel-body">
                        <div className="row">

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-5.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-body">
                                        <div className="ms-card-heading-title">
                                            <h6>Meat Stew</h6>
                                            <span className="green-text"><strong>$25.00</strong></span>
                                        </div>

                                        <div className="ms-card-heading-title">
                                            <p>Orders <span className="red-text">15</span></p>
                                            <p>Income <span className="red-text">$175</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-2.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-body">
                                        <div className="ms-card-heading-title">
                                            <h6>Pancake</h6>
                                            <span className="green-text"><strong>$50.00</strong></span>
                                        </div>

                                        <div className="ms-card-heading-title">
                                            <p>Orders <span className="red-text">75</span></p>
                                            <p>Income <span className="red-text">$275</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-4.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-body">
                                        <div className="ms-card-heading-title">
                                            <h6>Burger</h6>
                                            <span className="green-text"><strong>$45.00</strong></span>
                                        </div>

                                        <div className="ms-card-heading-title">
                                            <p>Orders <span className="red-text">85</span></p>
                                            <p>Income <span className="red-text">$575</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-3.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-body">
                                        <div className="ms-card-heading-title">
                                            <h6>Saled</h6>
                                            <span className="green-text"><strong>$85.00</strong></span>
                                        </div>
                                        <div className="ms-card-heading-title">
                                            <p>Orders <span className="red-text">175</span></p>
                                            <p>Income <span className="red-text">$775</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default TrendingOrders;
