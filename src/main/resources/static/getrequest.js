$( document ).ready(function() {

    $("#dateTimePickerStart").datetimepicker({
        format:'Y/m/d H:i:s'
    });
    $("#dateTimePickerEnd").datetimepicker({
        format:'Y/m/d H:i:s'
    });

    $("#gradientChart").height($(document).height()*50/100);

    // based on prepared DOM, initialize echarts instance
    var gradientChart = echarts.init(document.getElementById('gradientChart'));

    var url = window.location;
    var startTime = '', endTime = '';

    function getInfo(startTime, endTime) {
        $.ajax({
            type : "GET",
            url : url + "temp",
            data: {
                startTime: startTime,
                endTime: endTime
            },
            success: function(result){

                var myTime=[];
                var myTemp=[];
                for(var i=0;i<result.length;i++){
                    var UTCTime=new Date(result[i].time);
                    var month="";
                    var tempMonth=UTCTime.getMonth()+1;
                    if(tempMonth<10){
                        month='0'+tempMonth;
                    }else{
                        month=tempMonth;
                    }
                    var date="";
                    if(UTCTime.getDate()<10){
                        date='0'+UTCTime.getDate();
                    }else{
                        date=UTCTime.getDate();
                    }

                    myTime.push(UTCTime.getFullYear()+'.'+month+'.'+date+'\n'+UTCTime.getHours()+':'+UTCTime.getMinutes()+':'+UTCTime.getSeconds());
                    myTemp.push(result[i].temp);
                }

                // gradientChart
                option = {
                    baseOption: {
                        backgroundColor: '#274B63',
                        title: {
                            text: 'RunChip',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 16,
                                color: 'white'
                            },
                            left: '6%'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        },
                        legend: {
                            icon: 'rect',
                            data: ['Temperature'],
                            textStyle: {
                                color: '#F1F1F3'
                            }
                        },
                        grid: {
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            axisLine: {
                                lineStyle: {
                                    color: 'white'
                                }
                            },
                            data: myTime
                        }],
                        yAxis: [{
                            type: 'value',
                            name: 'Value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'white'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#57617B'
                                }
                            }
                        }],
                        series: [{
                            name: 'Temperature',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1.5
                                }
                            },
                            /*areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(137, 189, 27, 0.3)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(137, 189, 27, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: 'rgb(137,189,27)',
                                    borderColor: 'rgba(137,189,2,0.27)',
                                    borderWidth: 12

                                }
                            },*/
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#DE66AE'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(178, 76, 141, 0)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#DE66AE',
                                    borderColor: 'rgba(178, 76, 141, 0.27)',
                                    borderWidth: 12

                                }
                            },
                            data: myTemp
                        }]
                    },
                    media: [
                        {
                            option: {
                                legend: {
                                    itemWidth: 14,
                                    itemHeight: 5,
                                    itemGap: 13,
                                    right: '4%',
                                    textStyle: {
                                        fontSize: 12
                                    }
                                },
                                grid: {
                                    left: '3%',
                                    right: '4%',
                                    bottom: '3%'
                                },
                                xAxis: [{
                                    boundaryGap: false
                                }],
                                yAxis: [{
                                    axisLabel: {
                                        margin: 10,
                                        textStyle: {
                                            fontSize: 14
                                        }
                                    }
                                }]
                            }
                        },
                        {
                            query: {maxWidth: 670, minWidth: 550},
                            option: {
                                legend: {
                                    orient: 'horizontal',
                                    left: 200,
                                    itemGap: 5
                                },
                                grid: {
                                    left: '10%',
                                    top: 80,
                                    right: 90,
                                    bottom: 100
                                },
                                xAxis: {
                                    nameLocation: 'end',
                                    nameGap: 10,
                                    splitNumber: 5,
                                    splitLine: {
                                        show: true
                                    }
                                },
                                series: [
                                    {center: ['75%', '30%'], radius: '28%'}
                                ]
                            }
                        },
                        {
                            query: {maxWidth: 550},
                            option: {
                                legend: {
                                    orient: 'vertical',
                                    left: 'right',
                                    itemGap: 5
                                },
                                grid: {
                                    left: 55,
                                    top: '32%',
                                    right: 100,
                                    bottom: 50
                                },
                                xAxis: {
                                    nameLocation: 'middle',
                                    nameGap: 25,
                                    splitNumber: 3
                                },
                                series: [
                                    {center: ['45%', '20%'], radius: '28%'}
                                ]
                            }
                        }
                    ]
                };

                /*option = {
                    backgroundColor: '#394056',
                    title: {
                        text: 'RunChip',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: '#F1F1F3'
                        },
                        left: '6%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        icon: 'rect',
                        itemWidth: 14,
                        itemHeight: 5,
                        itemGap: 13,
                        data: ['Temperature'],
                        right: '4%',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        data: myTime
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'Value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    }],
                    series: [{
                        name: 'Temperature',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(137, 189, 27, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(137, 189, 27, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)',
                                borderColor: 'rgba(137,189,2,0.27)',
                                borderWidth: 12

                            }
                        },
                        data: myTemp
                    }]
                };*/
                gradientChart.setOption(option);

            },
            error : function(e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        });
    }

    getInfo(startTime, endTime);

    // SUBMIT FORM
    $("#btn").click(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        if ($("#dateTimePickerStart").val() == ''|| $("#dateTimePickerEnd").val() == '') {
            alert("Set a date!");
        }
        else {
            startTime = (new Date($("#dateTimePickerStart").val())).getTime();
            endTime = (new Date($("#dateTimePickerEnd").val())).getTime();

            $("#dateTimePickerStart").val('');
            $("#dateTimePickerEnd").val('');

            getInfo(startTime, endTime);
        }
    });

    $(window).on('resize', function(){
        if(gradientChart != null && gradientChart != undefined){
            gradientChart.resize();
        }
    });
});