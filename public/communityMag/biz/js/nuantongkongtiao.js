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
            data:['冷机','锅炉','新风机组','组合空调','吊装空调']
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
                    {value:6 , name:'冷机'},
                    {value:5, name:'锅炉'},
                    {value:27, name:'新风机组'},
                    {value:42, name:'组合空调'},
                    {value:110, name:'吊装空调'}
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
            data:['冷机','锅炉','新风机组','组合空调','吊装空调']
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
                name:'台',
                nameTextStyle:{color:'white'}
            }
        ],
        series : [
            {
                name:'冷机',
                type:'line',
                data:[0, 1, 0, 0, 1, 0,0]
            },
            {
                name:'锅炉',
                type:'line',
                data:[1, 0, 0, 0, 0, 0, 0]
            },
            {
                name:'新风机组',
                type:'line',
                data:[0, 0, 2,0, 0, 3, 0]
            },
            {
                name:'组合空调',
                type:'line',
                data:[5, 0, 0,0, 0, 0, 2]
            },
            {
                name:'吊装空调',
                type:'line',
                data:[7, 0, 0,3, 0, 1, 1]
            }

        ]
    };
    echart2.setOption(option2);
});