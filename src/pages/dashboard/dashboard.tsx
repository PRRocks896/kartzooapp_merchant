import React from 'react';
import SideBar from './component/sidebar/sidebar';
import Constant from '../../constant/constant';
import utils from '../../utils';

class Dashboard extends React.Component {

    componentDidMount() {
        document.title = Constant.dashboardTitle + utils.getAppName();
    }


    render() {
        return (
           <SideBar/>
        );
    }
}

export default Dashboard;
