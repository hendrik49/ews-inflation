async function refreshValues(id) {
	fetching = true;
	agustus = {
                    11:2.37,
                    12:0.73,
                    13:2.30,
                    14:1.81,
                    21:2.71,
                    15:1.67,
                    17:2.24,
                    16:2.25,
                    19:3.25,
                    18:1.66,
                    31:3.13,
                    36:3.55,
                    32:3.22,
                    33:2.89,
                    34:3.01,
                    35:3.29,
                    61:4.05,
                    62:4.48,
                    63:3.16,
                    64:3.48,
                    65:5.49,
                    71:4.45,
                    72:5.96,
                    73:3.39,
                    74:2.68,
                    75:2.86,
                    81:3.11,
                    82:4.23,
                    94:7.20,
                    91:5.19,
                    76:1.24,
                    51:3.24,
                    52:3.20,
                    53:2.34 
	}
	if (year.classed('selected')) {
		d3.select('g#legend').classed('hidden', false);

		await d3.json(baseURL + 'inflation' + (id ? '/' + id : '')).then((result) => {
			
			if(id==undefined){
				result[1561961474000] = 2.92;
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

