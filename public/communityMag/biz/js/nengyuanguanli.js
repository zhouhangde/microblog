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
                    {value:22115.22 , name:'孝感A小区'},
                    {value:14415.22, name:'孝感B小区'},
                    {value:17325.22, name:'孝感C小区'}
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
                name:'kwh',
                nameTextStyle:{color:'white'}
            }
        ],
        series : [
            {
                name:'孝感A小区',
                type:'line',
                data:[11415.22, 13114.82, 11171.13, 13163.42, 10956.11, 13172.12,13154.73]
            },
            {
                name:'孝感B小区',
                type:'line',
                data:[15123.17, 12341.73, 14134.73, 13245.51, 17123.42, 16512.53, 13212.63]
            },
            {
                name:'孝感C小区',
                type:'line',
                data:[11623.72, 13123.72, 16321.72,13213.76, 14213.81, 14355.63, 14456.26]
            }
        ]
    };
    echart2.setOption(option2);
});