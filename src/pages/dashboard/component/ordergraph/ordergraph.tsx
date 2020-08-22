import React from 'react';
import { Line } from 'react-chartjs-2';



class OrderGraph extends React.Component {

    state = {
        isOpen: true,
        // labels: ['12AM', '2PM', '4PM',
        //     '6PM', '8PM', '10PM', '12PM', '2PM', '4PM',
        //     '6PM', '8PM', '10PM'],
        datasets: [
            {
                label: 'Graphs',
                backgroundColor: '#fbb132',
                // borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    };


    render() {
        return (
            <>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                        <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 3.2%</span>
                        <div className="ms-card-body media">
                            <div className="media-body">
                                <span className="black-text"><strong>Sells Graph</strong></span>
                                <h2>$8,451</h2>
                            </div>
                        </div>
                        <Line
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    fontSize: 24
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                        {/* <canvas id="line-chart"></canvas> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                        <span className="ms-chart-label bg-red"><i className="material-icons">arrow_downward</i> 4.5%</span>
                        <div className="ms-card-body media">
                            <div className="media-body">
                                <span className="black-text"><strong>Total Visitors</strong></span>
                                <h2>3,973</h2>
                            </div>
                        </div>
                        <Line
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    fontSize: 24
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                        {/* <canvas id="line-chart-2"></canvas> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                        <span className="ms-chart-label bg-black"><i className="material-icons">arrow_upward</i> 12.5%</span>
                        <div className="ms-card-body media">
                            <div className="media-body">
                                <span className="black-text"><strong>New Users</strong></span>
                                <h2>7,333</h2>
                            </div>
                        </div>
                        <Line
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    fontSize: 24
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                        {/* <canvas id="line-chart-3"></canvas> */}
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="ms-card ms-widget has-graph-full-width ms-infographics-widget">
                        <span className="ms-chart-label bg-red"><i className="material-icons">arrow_upward</i> 9.5%</span>
                        <div className="ms-card-body media">
                            <div className="media-body">
                                <span className="black-text"><strong>Total Orders</strong></span>
                                <h2>48,973</h2>
                            </div>
                        </div>
                        <Line
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    fontSize: 24
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                        {/* <canvas id="line-chart-4"></canvas> */}
                    </div>
                </div>
            </>
        );
    }
}

export default OrderGraph;
