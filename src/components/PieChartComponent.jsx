import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import { Divider } from 'semantic-ui-react';
import statistics from '../_mock/statistics'

export default class PieChartComponent extends React.Component {

    myDataSource = {
        chart: {
            caption: 'Asset Statistics',
            subCaption: 'Assets status breakdown',
        },
        data: statistics,
    }

    chartConfigs = {
        id: 'pie_chart',
        type: 'pie2d',
        width: '35%',
        height: 400,
        dataFormat: 'json',
        dataSource: this.myDataSource,
    }

    render() {
        return (
            <div className="pieChartGraph">
                <Divider hidden/>
                <ReactFC {...this.chartConfigs} />
            </div>
        )
    }

}