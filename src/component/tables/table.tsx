import React from 'react';

class TableComponent extends React.Component<{column:any,row:any}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <table id="dtBasicExample" className="table table-striped table-bordered table-sm" width="100%">
                <thead>
                    <tr>
                        {
                            this.props.column.map((col:any) => {
                                return (
                                    <th className="th-sm">{col.title}
                                    </th>
                                )
                            })
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.row.map((data:any,index1:any) => {
                            console.log("index1",index1)
                            return (
                                <tr key={index1}>
                                 {
                            this.props.column.map((col:any,index:any) => {
                                console.log("index",index)
                                return (
                                    <td key={index} className="td-sm">
                                        {data[index1][col[index].name]}
                                    </td>
                                )
                            })
                        }
                                {/* <td>{data[col.name]}</td>
                                <td>{data[col.name]}</td>
                                <td>{data[col.name]}</td> */}
                                {/* <td style={{ textAlign: "center" }}>
                                  <i className="fa fa-check"></i>
                                </td>
                                <td className="action">
                                  <span className="padding">
                                    <i
                                      className="fa fa-eye"
                                      onClick={() => this.viewuser(data)}
                                    ></i>
                                    <i
                                      className="fas fa-edit"
                                      onClick={() => this.edituser(data)}
                                    ></i>
                                    <i
                                      className="far fa-trash-alt"
                                      onClick={() => this.deleteuser(data.userID)}
                                    ></i>
                                  </span>
                                </td> */}
                              </tr>
                            )
                        }

                        )
                    }
                </tbody>

            </table>
        )
    }
}

export default TableComponent;