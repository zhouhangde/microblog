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
                    {value:28, name:'孝感A小区'},
                    {value:34, name:'孝感B小区'},
                    {value:26, name:'孝感C小区'}
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
                data:[2, 1, 4, 3, 0, 0, 0]
            },
            {
                name:'孝感B小区',
                type:'line',
                data:[3, 6, 4, 11, 0, 0, 0]
            },
            {
                name:'孝感C小区',
                type:'line',
                data:[9, 15, 11,7, 0, 0, 0]
            }
        ]
    };
    echart2.setOption(option2);
});