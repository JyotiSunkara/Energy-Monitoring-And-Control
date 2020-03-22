import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, ChartLabel } from 'react-vis';
import './data.css'


class Data extends Component {
    state = {}
    render() {
        const tempData = [
            { x: "Mon", y: 22 },
            { x: "Tue", y: 24 },
            { x: "Wed", y: 25 },
            { x: "Thu", y: 21 },
            { x: "Fri", y: 23 },
            { x: "Sat", y: 26 },
            { x: "Sun", y: 25 }
        ];
        const timeData = [
            { x: "Mon", y: 6 },
            { x: "Tue", y: 5 },
            { x: "Wed", y: 8 },
            { x: "Thu", y: 10 },
            { x: "Fri", y: 8 },
            { x: "Sat", y: 10 },
            { x: "Sun", y: 7 }
        ];
        return (
            <div>
                <h2 class="h2">Data Trends</h2>
                <div class="data">
                    <XYPlot height={400} width={500} xType="ordinal">
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Day"/>
                        <YAxis title="Avg AC Temp"/>
                        <LineSeries data={tempData} />

                    </XYPlot>
                    <br></br><br></br>
                    <XYPlot height={400} width={500} xType="ordinal">
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Day"/>
                        <YAxis title="Hours"/>
                        <LineSeries data={timeData}  color="green"/>
                    </XYPlot>

                </div>
            </div>
        );
    }
}

export default Data; 