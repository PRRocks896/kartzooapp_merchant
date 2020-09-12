import React from 'react';
import Constant from '../../constant/constant';
import utils from '../../utils';
import OrderGraph from './component/ordergraph/ordergraph';
import OrderRequest from './component/orderrequest/orderrequest';
import MonthlyRevenue from './component/monthlyrevenue/monthlyrevenue';
import TrendingOrders from './component/trendingorders/trendingorders';
import TimingChart from './component/timingchart/timingchart';
import FavouriteCharts from './component/favouritecharts/favouritecharts';
import PlaceOrders from './component/placeorders/placeorders';
import ResturantListings from './component/resturantslisting/resturantslisting';

interface User {
    firstName?: string,
    lastName?: string
  }

class Dashboard extends React.Component {

    state = {
        isOpen: true,
        side: true,
        firstName:'',
        lastName:''
    };
    
    constructor(props:any) {
        super(props);
    }
    
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    
    toggleCollapseRight = () => {
        this.setState({ side: !this.state.side });
    }
    
    closeNav = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    componentDidMount() {
        document.title = Constant.dashboardTitle + utils.getAppName();
        var user = localStorage.getItem("user");
        if (user) {
            var username = JSON.parse(user);
            this.setState({
                firstName: this.state.firstName = username.firstName,
                lastName: this.state.lastName = username.lastName
            })
        }
    }

    render() {
        return (
            <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    {
                        this.state.firstName || this.state.lastName ? (
                            <h1 className="db-header-title">Welcome, {this.state.firstName} {this.state.lastName}</h1>
                        ) : (
                            <h1 className="db-header-title">Welcome, Any</h1>
                        )
                    }
                </div>
                <OrderGraph />

                <div className="col-xl-6 col-md-12">
                    <OrderRequest />
                </div>
                <div className="col-xl-6 col-md-12">
                    <MonthlyRevenue />
                </div>

                <div className="col-md-12">
                    <TrendingOrders />
                </div>

                <div className="col-xl-7 col-md-12">
                    <TimingChart />
                </div>


                <div className="col-xl-5 col-md-12">
                    <FavouriteCharts />
                </div>

                <div className="col-12">
                    <PlaceOrders />
                </div>


                <div className="col-md-12">
                    <ResturantListings />
                </div>


                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <div className="d-flex justify-content-between">
                                <div className="align-self-center align-left">
                                    <h6>Recent Support Tickets</h6>
                                </div>
                                <a href="#" className="btn btn-primary"> View All</a>
                            </div>
                        </div>
                        <div className="ms-panel-body p-0">
                            <ul className="ms-list ms-feed ms-twitter-feed ms-recent-support-tickets">
                                <li className="ms-list-item">
                                    <a href="#" className="media clearfix">
                                        <img src="./assets/img/costic/customer-4.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                        <div className="media-body">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                <span className="badge badge-success"> Open </span>
                                            </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                            <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div className="ms-feed-controls"> <span>
                                                    <i className="material-icons">chat</i> 16
                          </span>
                                                    <span>
                                                        <i className="material-icons">attachment</i> 3
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="ms-list-item">
                                    <a href="#" className="media clearfix">
                                        <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                        <div className="media-body">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                <span className="badge badge-success"> Open </span>
                                            </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                            <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div className="ms-feed-controls"> <span>
                                                    <i className="material-icons">chat</i> 11
                          </span>
                                                    <span>
                                                        <i className="material-icons">attachment</i> 1
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="ms-list-item">
                                    <a href="#" className="media clearfix">
                                        <img src="./assets/img/costic/customer-7.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                        <div className="media-body">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                <span className="badge badge-danger"> Closed </span>
                                            </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2019</span>
                                            <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div className="ms-feed-controls"> <span>
                                                    <i className="material-icons">chat</i> 21
                          </span>
                                                    <span>
                                                        <i className="material-icons">attachment</i> 5
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh ms-widget ms-chat-conversations">
                        <div className="ms-panel-header">
                            <div className="ms-chat-header justify-content-between">
                                <div className="ms-chat-user-container media clearfix">
                                    <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                                        <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body ms-chat-user-info mt-1">
                                        <h6>Heather Brown</h6>
                                        <span className="text-disabled fs-12">
                                            Active Now
                    </span>
                                    </div>
                                </div>
                                <ul className="ms-list ms-list-flex ms-chat-controls">
                                    <li data-toggle="tooltip" data-placement="top" title="Call"> <i className="material-icons">local_phone</i>
                                    </li>
                                    <li data-toggle="tooltip" data-placement="top" title="Video Call"> <i className="material-icons">videocam</i>
                                    </li>
                                    <li data-toggle="tooltip" data-placement="top" title="Add to Chat"> <i className="material-icons">person_add</i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="ms-panel-body ms-scrollable">
                            <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                <div className="ms-chat-status ms-status-online ms-chat-img">
                                    <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                </div>
                                <div className="media-body">
                                    <div className="ms-chat-text">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <p className="ms-chat-time">10:33 pm</p>
                                </div>
                            </div>
                            <div className="ms-chat-bubble ms-chat-message ms-chat-incoming media clearfix">
                                <div className="ms-chat-status ms-status-online ms-chat-img">
                                    <img src="./assets/img/costic/customer-2.jpg" className="ms-img-round" alt="people" />
                                </div>
                                <div className="media-body">
                                    <div className="ms-chat-text">
                                        <p>I'm doing great, thanks for asking</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                    </div>
                                    <p className="ms-chat-time">11:01 pm</p>
                                </div>
                            </div>
                            <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                <div className="ms-chat-status ms-status-online ms-chat-img">
                                    <img src="./assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                </div>
                                <div className="media-body">
                                    <div className="ms-chat-text">
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                        <p>There are many variations of passages of Lorem Ipsum available</p>
                                    </div>
                                    <p className="ms-chat-time">11:03 pm</p>
                                </div>
                            </div>
                            <div className="ms-panel-footer">
                                <div className="ms-chat-textbox">
                                    <ul className="ms-list-flex mb-0">
                                        <li className="ms-chat-vn"><i className="material-icons">mic</i>
                                        </li>
                                        <li className="ms-chat-input">
                                            <input type="text" name="msg" placeholder="Enter Message" />
                                        </li>
                                        <li className="ms-chat-text-controls ms-list-flex"> <span> <i className="material-icons">tag_faces</i> </span>
                                            <span> <i className="material-icons">attach_file</i> </span>
                                            <span> <i className="material-icons">camera_alt</i> </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
        );
    }
}

export default Dashboard;
