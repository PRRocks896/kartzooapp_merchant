import React from 'react';

class MonthlyRevenue extends React.Component {


    render() {
        return (
            <>
                <div className="ms-panel ms-panel-fh">
                    <div className="ms-panel-header new">
                        <h6>Monthly Revenue</h6>
                        <select className="form-control new" id="exampleSelect">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March </option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="1">June</option>
                            <option value="2">July</option>
                            <option value="3">August</option>
                            <option value="4">September</option>
                            <option value="5">October</option>
                            <option value="4">November</option>
                            <option value="5">December</option>
                        </select>
                    </div>
                    <div className="ms-panel-body">
                        <span className="progress-label"> <strong>Week 1</strong> </span>
                        <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
                        </div>
                        <span className="progress-label"> <strong>Week 2</strong> </span>
                        <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>50%</div>
                        </div>
                        <span className="progress-label"> <strong>Week 3</strong> </span>
                        <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>75%</div>
                        </div>
                        <span className="progress-label"> <strong>Week 4</strong> </span>
                        <div className="progress">
                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '40%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>40%</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MonthlyRevenue;
