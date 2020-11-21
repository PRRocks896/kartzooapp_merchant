import React from 'react';
import { Bar } from 'react-chartjs-2';

class TimingChart extends React.Component {
    state = {
        isOpen: true,
        labels: ['12AM', '2PM', '4PM',
            '6PM', '8PM', '10PM', '12PM', '2PM', '4PM',
            '6PM', '8PM', '10PM'],
        datasets: [
            {
                label: 'Rainfall',
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
                <div className="ms-panel ms-panel-fh">
                    <div className="ms-panel-header">
                        <div className="d-flex justify-content-between">
                            <div className="ms-header-text">
                                <h6>Order Timing Chart</h6>
                            </div>
                        </div>

                    </div>
                    <div className="ms-panel-body pt-0">
                        <div className="d-flex justify-content-between ms-graph-meta">
                            <ul className="ms-list-flex mt-3 mb-5">
                                <li>
                                    <span>Total Orders</span>
                                    <h3 className="ms-count">703,49</h3>
                                </li>
                                <li>
                                    <span>New Orders</span>
                                    <h3 className="ms-count">95,038</h3>
                                </li>
                                <li>
                                    <span>Repeat Orders</span>
                                    <h3 className="ms-count">28,387</h3>
                                </li>
                                <li>
                                    <span>Cancel Orders</span>
                                    <h3 className="ms-count">260</h3>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Bar
                                data={this.state}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Average Rainfall per month',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                        </div>
                        {/* <canvas id="youtube-subscribers"></canvas> */}
                    </div>
                </div>
            </>
        );
    }
}

export default TimingChart;
