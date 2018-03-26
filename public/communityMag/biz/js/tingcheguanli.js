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
            data:['孝感A小区','孝感B小区','孝感C小区']
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
                    {value:163, name:'孝感A小区'},
                    {value:234, name:'孝感B小区'},
                    {value:126, name:'孝感C小区'}
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
            data:['孝感A小区','孝感B小区','孝感C小区']
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
                name:'孝感A小区',
                type:'line',
                data:[112, 98, 101,86, 79, 108,96]
            },
            {
                name:'孝感B小区',
                type:'line',
                data:[124, 99, 143, 110,196, 221, 128]
            },
            {
                name:'孝感C小区',
                type:'line',
                data:[91, 87, 74,77, 69, 90, 98]
            }
        ]
    };
    echart2.setOption(option2);
});