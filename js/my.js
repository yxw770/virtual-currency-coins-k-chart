const time=5000;
function getData(id) {
				var url = 'https://t.idccap.com/api/v1/Godfrey/get_K';
				$.ajax({
					type: "POST",
					url: url,
					data: {
						id: id,
					}, //可选参数
					dataType: "json",
					success: function(response) {
						var chartDataList = response.data.list.map(function(data) {
							return {
								timestamp: +data[0],
								open: +data[1],
								high: +data[2],
								low: +data[3],	
								close: +data[4],
								volume: +data[5],
								base_coin:response.data.base_coin,
								rmb:response.data.rmb,
							}
								
						})
						chart.setPriceVolumePrecision(response.data.pricePrecision,response.data.volumePrecision)
						chart.applyNewData(chartDataList)
					} //可选参数
				});


			}