import React from 'react';

class ResturantListings extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>New Resturant Listings</h6>
                    </div>
                    <div className="ms-panel-body">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-body">
                                        <div className="media fs-14">
                                            <div className="mr-2 align-self-center">
                                                <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <h6>Hunger House </h6>
                                                <div className="dropdown float-right">
                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        <li className="ms-dropdown-list">
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Sales</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Details</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Remove</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                            </div>

                                        </div>
                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                    </div>
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-1.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-footer text-disabled d-flex">
                                        <div className="ms-card-options">
                                            <i className="material-icons">favorite</i> 982
                              </div>
                                        <div className="ms-card-options">
                                            <i className="material-icons">comment</i> 785
                              </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-body">
                                        <div className="media fs-14">
                                            <div className="mr-2 align-self-center">
                                                <img src="./assets/img/costic/customer-2.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <h6>Food Lounge</h6>
                                                <div className="dropdown float-right">
                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        <li className="ms-dropdown-list">
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Sales</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Details</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Remove</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                            </div>

                                        </div>
                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                    </div>
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-2.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-footer text-disabled d-flex">
                                        <div className="ms-card-options">
                                            <i className="material-icons">favorite</i> 982
                              </div>
                                        <div className="ms-card-options">
                                            <i className="material-icons">comment</i> 785
                              </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card no-margin">
                                    <div className="ms-card-body">
                                        <div className="media fs-14">
                                            <div className="mr-2 align-self-center">
                                                <img src="./assets/img/costic/customer-6.jpg" className="ms-img-round" alt="people" />
                                            </div>
                                            <div className="media-body">
                                                <h6>Delizious </h6>
                                                <div className="dropdown float-right">
                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="material-icons">more_vert</i>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        <li className="ms-dropdown-list">
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Sales</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Details</span>
                                                                </div>
                                                            </a>
                                                            <a className="media p-2" href="#">
                                                                <div className="media-body">
                                                                    <span>Remove</span>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <p className="fs-12 my-1 text-disabled">30 seconds ago</p>
                                            </div>

                                        </div>
                                        <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                            <li className="ms-rating-item"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                            <li className="ms-rating-item rated"> <i className="material-icons">star</i> </li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc velit, dictum eget nulla a, sollicitudin rhoncus orci. Vivamus nec commodo turpis.</p>
                                    </div>
                                    <div className="ms-card-img">
                                        <img src="./assets/img/costic/food-3.jpg" alt="card_img" />
                                    </div>
                                    <div className="ms-card-footer text-disabled d-flex">
                                        <div className="ms-card-options">
                                            <i className="material-icons">favorite</i> 982
                              </div>
                                        <div className="ms-card-options">
                                            <i className="material-icons">comment</i> 785
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

export default ResturantListings;
