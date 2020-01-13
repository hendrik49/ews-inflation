async function refreshValues(id) {
	fetching = true;
	agustus = {
		     11:2.93,
                     12:2.73,
                     13:2.50,
                     14:2.91,
                     21:2.71,
                     15:3.10,
                     17:2.30,
                     16:2.25,
                     19:3.02,
                     18:2.81,
                     31:3.06,
                     36:3.20,
                     32:3.22,
                     33:2.89,
                     34:2.83,
                     35:2.65,
                     61:3.09,
                     62:3.29,
                     63:3.42,
                     64:3.13,
                     65:3.58,
                     71:3.45,
                     72:4.29,
                     73:3.39,
                     74:2.68,
                     75:2.86,
                     81:2.48,
                     82:2.75,
                     94:3.60,
                     91:3.30,
                     76:2.61,
                     51:2.70,
                     52:2.93,
                     53:2.34

	}
	if (year.classed('selected')) {
		d3.select('g#legend').classed('hidden', false);

		await d3.json(baseURL + 'inflation' + (id ? '/' + id : '')).then((result) => {
			result = {
1546300800000:2.83,
1548979200000:2.57,
1554076800000:2.84,
1556668800000:3.32,
1559347200000:3.34,
1561939200000:3.31,
1564617600000:3.49,
1567296000000:3.40,
1569888000000:3.13,
1572566400000:3.00,
1575158400000:2.74,
1577836800000:2.94
			}
			if(id==undefined){
				result[1561961474000] = 2.94;
			}else{
				result[1561961474000] = agustus[id];
			}
			
			updateLine(result); 
		}).catch(function(error) {
                     return console.log(error);
                });
		await d3.json(baseURL + 'wordcloud' + (id ? '/' + id : '')).then((result) => { 
			updateWordcloud(result); 
		}).catch(function(error) {
		     return console.log(error);
                });
	} else {
                 
		d3.select('g#legend').classed('hidden', true);

		await d3.json(baseURL + 'monthly' + (id ? '/' + id : '')).then((result) => {
                 monthlyscore = {
		     11:0.23,
		     12:0.45,
		     13:0.39,
		     14:0.66,
		     21:0.57,
		     15:0.24,
		     17:0.95,
		     16:0.45,
		     19:1.24,
		     18:0.32,
		     31:0.30,
		     36:0.40,
		     32:0.41,
		     33:0.28,
		     34:0.45,
		     35:0.35,
		     61:0.62,
		     62:0.39,
		     63:0.68,
		     64:0.55,
		     65:0.71,
		     71:0.89,
		     72:0.74,
		     73:0.82,
		     74:0.68,
		     75:0.71,
		     81:0.40,
		     82:0.68,
		     94:-0.01,
		     91:0.62,
		     76:0.35,
		     51:1.00,
		     52:0.82,
		     53:0.64
}
                  if(id==undefined){
                               result[1561961474000] = 0.43;
                   }else{
                                result[1561961474000] = monthlyscore[id];
                  }

	         updateLine(result); 
		}).catch(function(error) {
                     return console.log(error);
                });
		await d3.json(baseURL + 'wordcloud' + (id ? '/' + id : '')).then((result) => { 
			updateWordcloud(result); 
		}).catch(function(error) {
                     return console.log(error);
                });
	}

	setTimeout(() => { fetching = false; }, def_duration + 50);
}

