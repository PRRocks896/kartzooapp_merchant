import React from 'react';
import {Link } from 'react-router-dom';
import nav from '../../navbar.service';
import constant from '../../constant/constant';
import EventEmitter from '../../event';
import { navBarStateRequest } from '../../modelController';

class NavBar extends React.Component {
    navbarState = constant.navbarPage.state
    state: navBarStateRequest = {
        isOpen: this.navbarState.isOpen,
        side: this.navbarState.side,
        file:this.navbarState.file,
        firstName:this.navbarState.firstName,
        lastName:this.navbarState.lastName,
        classshow:this.navbarState.classshow
    };

    constructor(props:any) {
        super(props);
        this.activeRoute = this.activeRoute.bind(this);
        this.handleClick = this.handleClick.bind(this);

        EventEmitter.subscribe('imageUpload', (data:any) => {
            this.setState({
                file: this.state.file = data,
            })

        });
        EventEmitter.subscribe('firstname', (data:any) => {
            this.setState({
                firstName: this.state.firstName = data,
            })

        });
        EventEmitter.subscribe('lastname', (data:any) => {
            this.setState({
                lastName: this.state.lastName = data,
            })

        });
    }

    componentDidMount() {
        var user = localStorage.getItem("user");
        if (user) {
            var username = JSON.parse(user);
            this.setState({
                file: this.state.file = username.profilePhotoPath ? username.profilePhotoPath : '',
                firstName: this.state.firstName = username.firstName,
                lastName: this.state.lastName = username.lastName
            })
        }
    }

    activeRoute(routeName:any) {
        const route = window.location.hash.split('#')[1];
        return route === routeName ? `active collapsed sidebar-manage` : `collapsed sidebar-manage`;
    
      }

      handleClick(url:any) {
          window.location.href=`/#${url}`;
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

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        // this.props.history.push('/login');
        window.location.href="/#/login";
    }

    render() {

        return (
            <div className={this.state.isOpen == true ? "ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar" : "ms-body ms-primary-theme ms-has-quickbar"}>

                <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>
                <aside id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">

                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/dashboard"><img src="./assets/images/logo1.svg" alt="logo" /></Link>
                    </div>

                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        <span className="arrow" style={{ color: '#fb3', fontSize: '25px', margin: '15px', fontWeight: 600 }} onClick={this.closeNav}>x</span>
                           <li className="menu-item">
                           {
                                   nav.items.map((menu:any,index:any) => (
                                    menu.type === 'header' ? (
                                        <div key={index} className="menu_name">

                                            <span  className="header_side">{menu.name}</span>
                                        </div>
                                    ): (
                                      
                                        <a  key={index} href="#" id={`dropdown-${menu.id}`} className={this.activeRoute(menu.url)} data-toggle="collapse" data-target={`#${menu.id}`} aria-expanded="false" aria-controls={`${menu.id}`}  onClick={() => this.handleClick(menu.url)}> <span><i className={menu.icon}></i>{menu.name} </span>
                                        </a>
                                   
                                    )
                                   ))
                               }
                               </li>


                        {/* <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#dashboard" aria-expanded="false" aria-controls="dashboard"> <span><i className="material-icons fs-16">dashboard</i>Dashboard </span>
                            </a>
                            <ul id="dashboard" className="collapse" aria-labelledby="dashboard" data-parent="#side-nav-accordion">
                                <li> <a href="index-2.html">Costic</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#usermanagment" aria-expanded="false" aria-controls="usermanagment"> <span><i className="fa fa-users fs-16"></i>User Management </span>
                            </a>
                            <ul id="usermanagment" className="collapse" aria-labelledby="usermanagment" data-parent="#side-nav-accordion">
                                <li><Link to="/users">User</Link>
                                </li>
                                <li> <Link to="/userrole">Role</Link>
                                </li>
                                <li> <Link to="/userroletorights">Role Privileges</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#categorymanagment" aria-expanded="false" aria-controls="categorymanagment"> <span><i className="fa fa-list fs-16"></i>Category Management </span>
                            </a>
                            <ul id="categorymanagment" className="collapse" aria-labelledby="categorymanagment" data-parent="#side-nav-accordion">
                                <li><Link to="/category">Category</Link>
                                </li>
                                <li> <Link to="/subcategory">Sub Category</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#locationmanagment" aria-expanded="false" aria-controls="locationmanagment"> <span><i className="fa fa-location-arrow fs-16"></i>Location Management </span>
                            </a>
                            <ul id="locationmanagment" className="collapse" aria-labelledby="locationmanagment" data-parent="#side-nav-accordion">
                                <li><Link to="/country">Country Management</Link>
                                </li>
                                <li><Link to="/state">State Management</Link>
                                </li>
                                <li> <Link to="/city">City Management</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <Link to="/coupon"><span><i className="fa fa-gift fs-16"></i>Coupon Management </span></Link>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#merchantmanagment" aria-expanded="false" aria-controls="merchantmanagment"> <span><i className="fa fa-location-arrow fs-16"></i>Merchant Management </span>
                            </a>
                            <ul id="merchantmanagment" className="collapse" aria-labelledby="merchantmanagment" data-parent="#side-nav-accordion">
                                <li><Link to="/merchant">Merchant Management</Link>
                                </li>
                                <li><Link to="/merchant-business">Business Management</Link>
                                </li>
                                <li><Link to="/list-merchant-review">Review Management</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#productmanagment" aria-expanded="false" aria-controls="productmanagment"> <span><i className="fa fa-shopping-cart fs-16"></i>Product Management </span>
                            </a>
                            <ul id="productmanagment" className="collapse" aria-labelledby="productmanagment" data-parent="#side-nav-accordion">
                                <li><Link to="/list-product">Product Management</Link>
                                </li>
                                <li><Link to="/list-product-image">Image Management</Link>
                                </li>
                                <li><Link to="/list-product-inventory">Inventory Management</Link>
                                </li>
                                <li><Link to="/list-product-review">Review Management</Link>
                                </li>
                                <li><Link to="/product-addondetail">AddOn Management</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <Link to="/delivery"><span><i className="fa fa-truck fs-16"></i>Delivery Management </span></Link>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#product" aria-expanded="false" aria-controls="product"> <span><i className="fa fa-archive fs-16"></i>Menus </span>
                            </a>
                            <ul id="product" className="collapse" aria-labelledby="product" data-parent="#side-nav-accordion">
                                <li> <a href="pages/product/productcata.html">Menu Catalogue</a>
                                </li>
                                <li> <a href="pages/product/productlist.html">Menu List</a>
                                </li>
                                <li> <a href="pages/product/productgrid.html">Menu Grid</a>
                                </li>
                                <li> <a href="pages/product/addproduct.html">Add Product</a>
                                </li>
                                <li> <a href="pages/product/productdetail.html">Product Detail</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/orders.html"> <span><i className="fas fa-clipboard-list fs-16"></i>Orders</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="pages/restaurants.html"> <span><i className="fa fa-tasks fs-16"></i>Restaurants List</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#invoice" aria-expanded="false" aria-controls="invoice"> <span><i className="fas fa-file-invoice fs-16"></i>Invoice </span>
                            </a>
                            <ul id="invoice" className="collapse" aria-labelledby="invoice" data-parent="#side-nav-accordion">
                                <li> <a href="pages/invoice/invoicedetail.html">Invoice Detail</a>
                                </li>
                                <li> <a href="pages/invoice/invoicelist.html">Invoice List</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#customer" aria-expanded="false" aria-controls="customer"> <span><i className="fas fa-user-friends fs-16"></i>Customers </span>
                            </a>
                            <ul id="customer" className="collapse" aria-labelledby="customer" data-parent="#side-nav-accordion">
                                <li> <a href="pages/customer/customersreview.html">Customers Review</a>
                                </li>
                                <li> <a href="pages/customer/customersreview.html">Customers List</a>
                                </li>
                                <li> <a href="pages/customer/social.html">Social Activity</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/sales.html"> <span><i className="fa fa-briefcase fs-16"></i>Sales</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="pages/widgets.html"> <span><i className="material-icons fs-16">widgets</i>Widgets</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#basic-elements" aria-expanded="false" aria-controls="basic-elements"> <span><i className="material-icons fs-16">filter_list</i>Basic UI Elements</span>
                            </a>
                            <ul id="basic-elements" className="collapse" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/ui-basic/accordions.html">Accordions</a>
                                </li>
                                <li> <a href="pages/ui-basic/alerts.html">Alerts</a>
                                </li>
                                <li> <a href="pages/ui-basic/buttons.html">Buttons</a>
                                </li>
                                <li> <a href="pages/ui-basic/breadcrumbs.html">Breadcrumbs</a>
                                </li>
                                <li> <a href="pages/ui-basic/badges.html">Badges</a>
                                </li>
                                <li> <a href="pages/ui-basic/cards.html">Cards</a>
                                </li>
                                <li> <a href="pages/ui-basic/progress-bars.html">Progress Bars</a>
                                </li>
                                <li> <a href="pages/ui-basic/preloaders.html">Pre-loaders</a>
                                </li>
                                <li> <a href="pages/ui-basic/pagination.html">Pagination</a>
                                </li>
                                <li> <a href="pages/ui-basic/tabs.html">Tabs</a>
                                </li>
                                <li> <a href="pages/ui-basic/typography.html">Typography</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#advanced-elements" aria-expanded="false" aria-controls="advanced-elements"> <span><i className="material-icons fs-16">code</i>Advanced UI Elements</span>
                            </a>
                            <ul id="advanced-elements" className="collapse" aria-labelledby="advanced-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/ui-advanced/draggables.html">Draggables</a>
                                </li>
                                <li> <a href="pages/ui-advanced/sliders.html">Sliders</a>
                                </li>
                                <li> <a href="pages/ui-advanced/modals.html">Modals</a>
                                </li>
                                <li> <a href="pages/ui-advanced/rating.html">Rating</a>
                                </li>
                                <li> <a href="pages/ui-advanced/tour.html">Tour</a>
                                </li>
                                <li> <a href="pages/ui-advanced/cropper.html">Cropper</a>
                                </li>
                                <li> <a href="pages/ui-advanced/range-slider.html">Range Slider</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="pages/animation.html"> <span><i className="material-icons fs-16">format_paint</i>Animations</span>
                            </a>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#form-elements" aria-expanded="false" aria-controls="form-elements"> <span><i className="material-icons fs-16">input</i>Form Elements</span>
                            </a>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li> <a href="pages/form/form-elements.html">Form Elements</a>
                                </li>
                                <li> <a href="pages/form/form-layout.html">Form Layouts</a>
                                </li>
                                <li> <a href="pages/form/form-validation.html">Form Validation</a>
                                </li>
                                <li> <a href="pages/form/form-wizard.html">Form Wizard</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#charts" aria-expanded="false" aria-controls="charts"> <span><i className="material-icons fs-16">equalizer</i>Charts</span>
                            </a>
                            <ul id="charts" className="collapse" aria-labelledby="charts" data-parent="#side-nav-accordion">
                                <li> <a href="pages/charts/chartjs.html">Chart JS</a>
                                </li>
                                <li> <a href="pages/charts/morris-charts.html">Morris Chart</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#tables" aria-expanded="false" aria-controls="tables"> <span><i className="material-icons fs-16">tune</i>Tables</span>
                            </a>
                            <ul id="tables" className="collapse" aria-labelledby="tables" data-parent="#side-nav-accordion">
                                <li> <a href="pages/tables/basic-tables.html">Basic Tables</a>
                                </li>
                                <li> <a href="pages/tables/data-tables.html">Data tables</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#popups" aria-expanded="false" aria-controls="popups"> <span><i className="material-icons fs-16">message</i>Popups</span>
                            </a>
                            <ul id="popups" className="collapse" aria-labelledby="popups" data-parent="#side-nav-accordion">
                                <li> <a href="pages/popups/sweet-alerts.html">Sweet Alerts</a>
                                </li>
                                <li> <a href="pages/popups/toast.html">Toast</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#icons" aria-expanded="false" aria-controls="icons"> <span><i className="material-icons fs-16">border_color</i>Icons</span>
                            </a>
                            <ul id="icons" className="collapse" aria-labelledby="icons" data-parent="#side-nav-accordion">
                                <li> <a href="pages/icons/fontawesome.html">Fontawesome</a>
                                </li>
                                <li> <a href="pages/icons/flaticons.html">Flaticons</a>
                                </li>
                                <li> <a href="pages/icons/materialize.html">Materialize</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#maps" aria-expanded="false" aria-controls="maps"> <span><i className="material-icons fs-16">map</i>Maps</span>
                            </a>
                            <ul id="maps" className="collapse" aria-labelledby="maps" data-parent="#side-nav-accordion">
                                <li> <a href="pages/maps/google-maps.html">Google Maps</a>
                                </li>
                                <li> <a href="pages/maps/vector-maps.html">Vector Maps</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#bonuspages" aria-expanded="false" aria-controls="bonuspages"> <span><i className="material-icons fs-16">insert_drive_file</i> Bonus Pages</span>
                            </a>
                            <ul id="bonuspages" className="collapse" aria-labelledby="bonuspages" data-parent="#side-nav-accordion">
                                <li> <a href="pages/dashboard/web-analytics.html"> Web Analytics </a>
                                </li>
                                <li> <a href="pages/dashboard/project-management.html">Stock Management</a>
                                </li>
                                <li> <a href="pages/dashboard/client-management.html">Client Management</a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#pages" aria-expanded="false" aria-controls="pages"> <span><i className="material-icons fs-16">insert_drive_file</i>Pages</span>
                            </a>
                            <ul id="pages" className="collapse" aria-labelledby="pages" data-parent="#side-nav-accordion">
                                <li className="menu-item"> <a href="#" className="has-chevron" data-toggle="collapse" data-target="#authentication" aria-expanded="false" aria-controls="authentication">Authentication</a>
                                    <ul id="authentication" className="collapse" aria-labelledby="authentication" data-parent="#pages">
                                        <li> <a href="pages/prebuilt-pages/default-login.html">Default Login</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/modal-login.html">Modal Login</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/default-register.html">Default Registration</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/modal-register.html">Modal Registration</a>
                                        </li>
                                        <li> <a href="pages/prebuilt-pages/lock-screen.html">Lock Screen</a>
                                        </li>
                                    </ul>
                                </li>
                                <li> <a href="pages/prebuilt-pages/coming-soon.html">Coming Soon</a>
                                </li>
                                <li> <a href="pages/prebuilt-pages/error.html">Error Page</a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/faq.html"> FAQ </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/portfolio.html"> Portfolio </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/user-profile.html"> User Profile </a>
                                </li>
                                <li className="menu-item"> <a href="pages/prebuilt-pages/invoice.html"> Invoice </a>
                                </li>
                            </ul>
                        </li>

                        <li className="menu-item">
                            <a href="#" className="has-chevron" data-toggle="collapse" data-target="#apps" aria-expanded="false" aria-controls="apps"> <span><i className="material-icons fs-16">phone_iphone</i>Apps</span>
                            </a>
                            <ul id="apps" className="collapse" aria-labelledby="apps" data-parent="#side-nav-accordion">
                                <li> <a href="pages/apps/chat.html">Chat</a>
                                </li>
                                <li> <a href="pages/apps/email.html">Email</a>
                                </li>
                                <li> <a href="pages/apps/to-do-list.html">To-do List</a>
                                </li>
                            </ul>
                        </li> */}

                    </ul>
                </aside>

                <aside id="ms-recent-activity" className="side-nav fixed ms-aside-right ms-scrollable">
                    <div className="ms-aside-header">
                        <ul className="nav nav-tabs tabs-bordered d-flex nav-justified mb-3" role="tablist">
                            <li role="presentation" className="fs-12"><a href="#activityLog" aria-controls="activityLog" className="active" role="tab" data-toggle="tab"> Activity Log</a>
                            </li>
                            <li>
                                <button type="button" className="close ms-toggler text-center" data-target="#ms-recent-activity" data-toggle="slideRight"><span aria-hidden="true">&times;</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="ms-aside-body">
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active fade show" id="activityLog">
                                <ul className="ms-activity-log">
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-light"> <i className="flaticon-gear"></i>
                                        </div>
                                        <h6>Update 1.0.0 Pushed</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-success"> <i className="flaticon-tick-inside-circle"></i>
                                        </div>
                                        <h6>Profile Updated</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-warning"> <i className="flaticon-alert-1"></i>
                                        </div>
                                        <h6>Your payment is due</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-danger"> <i className="flaticon-alert"></i>
                                        </div>
                                        <h6>Database Error</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-info"> <i className="flaticon-information"></i>
                                        </div>
                                        <h6>Checkout what's Trending</h6>
                                        <span> <i className="material-icons">event</i>1 January, 2019</span>
                                        <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
                                    </li>
                                    <li>
                                        <div className="ms-btn-icon btn-pill icon btn-secondary"> <i className="flaticon-diamond"></i>
                                        </div>
                                        <h6>Your Dashboard is ready</h6>
                                        <span> <i className="material-icons">event</i>4 March, 2018</span>
                                        <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                                    </li>
                                </ul> <a href="#" className="btn btn-primary d-block"> View All </a>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="body-content">

                    <nav className="navbar ms-navbar">
                        <div className="ms-aside-toggler ms-toggler pl-0" data-target="#ms-side-nav" data-toggle="slideLeft" onClick={this.toggleCollapse}>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                        </div>
                        <div className="logo-sn logo-sm ms-d-block-sm">
                            <a className="pl-0 ml-0 text-center navbar-brand mr-0" href="">
                                <img src="./assets/images/logo2.svg" alt="logo" /> </a>
                        </div>

                        <ul className={this.state.side === true ? "ms-nav-list ms-inline mb-0" : "ms-nav-list ms-inline mb-0 ms-slide-down"} id="ms-nav-options">
                            {/* <li className="ms-nav-item ms-search-form pb-0 py-0">
            <form className="ms-form" method="post">
                <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                    <input type="search" className="ms-form-input" name="search" placeholder="Search here..." value="" /> <i className="flaticon-search text-disabled"></i>
                </div>
            </form>
        </li> */}

                            <li className="ms-nav-item ms-nav-user dropdown">
                                <a href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {
                                        this.state.file != '' ? (
                                            <img className="ms-user-img ms-img-round float-right" src={constant.fileMerchantpath + this.state.file} alt="people" />
                                        ) : (
                                            <img className="ms-user-img ms-img-round float-right" src="../../assets/img/costic/customer-3.jpg" alt="people" />
                                        )
                                    }
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                                    <li className="dropdown-menu-header">
                                        {
                                            this.state.firstName || this.state.lastName ? (
                                            <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, {this.state.firstName} {this.state.lastName}</span></h6>
                                            ) : (
                                                <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome, Anny Farisha</span></h6>
                                            )
                                        }
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li className="ms-dropdown-list">
                                    <Link className="media fs-14 p-2" to="/profile"> <span><i className="fa fa-user mr-2"></i> {constant.navbarPage.profile}</span></Link>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li className="ms-dropdown-list">
                                    <Link className="media fs-14 p-2" to="/change-password"> <span><i className="fa fa-lock mr-2"></i>{constant.navbarPage.changepassword}</span></Link>
                                    </li>
                                    <li className="dropdown-divider"></li>
                                    <li className="dropdown-menu-footer">
                                    <a className="media fs-14 p-2" onClick={this.logout}><span><i className="fa fa-chevron-circle-right mr-2"></i>{constant.navbarPage.logout}</span></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler" data-toggle="slideDown" data-target="#ms-nav-options" onClick={this.toggleCollapseRight}>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                            <span className="ms-toggler-bar bg-primary l-color"></span>
                        </div>

                    </nav>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default NavBar;
