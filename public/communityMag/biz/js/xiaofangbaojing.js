$(function(){
    var echart1 = echarts.init( document.querySelector('#myChart1') );
    var option1 = {
        title : {
            text: '2017年-10月-23日～2017年-10月-29日',
            x:'center',
            textStyle:{
                color:'white'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'right',
            y:'center',
            textStyle:{
                color:'white'
            },
            data:['消防报警','感温电缆','漏电火灾','燃气报警']
        },
        toolbox: {
            show : false
        },
        calculable : false,
        series : [
            {
                name:'',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:4, name:'消防报警'},
                    {value:21, name:'感温电缆'},
                    {value:2, name:'漏电火灾'},
                    {value:7, name:'燃气报警'}
                ]
            }
        ]
    };
    echart1.setOption(option1);

    var echart2 = echarts.init( document.querySelector('#myChart2') );
    var option2 = {
        title : {
            text: '2017年-10月-23日～2017年-10月-29日',
            x:'center',
            textStyle:{
                color:'white'
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            y:'bottom',
            textStyle:{color:'white'},
            data:['消防报警','感温电缆','漏电火灾','燃气报警']
        },
        toolbox: {
            show : false
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLabel : {
                    textStyle:{color:'white'}
                },
                data : ['2017-10-23','2017-10-24','2017-10-25','2017-10-26','2017-10-27','2017-10-28','2017-10-29']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}',
                    textStyle:{color:'white'}
                },
                name:'次',
                nameTextStyle:{color:'white'}
            }
        ],
        series : [
            {
                name:'消防报警',
                type:'line',
                data:[2, 1, 4, 3, 0, 0, 0]
            },
            {
                name:'感温电缆',
                type:'line',
                data:[3, 6, 4, 11, 0, 0, 0]
            },
            {
                name:'漏电火灾',
                type:'line',
                data:[9, 15, 11,7, 0, 0, 0]
            },
            {
                name:'燃气报警',
                type:'line',
                data:[2, 6, 1,5, 0, 0, 0]
            }
        ]
    };
    echart2.setOption(option2);
});