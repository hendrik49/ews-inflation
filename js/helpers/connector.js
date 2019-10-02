async function refreshValues(id) {
	fetching = true;
	agustus = {
                11:3.10,
                12:5.10,
                13:3.41,
                14:3.70,
                21:3.50,
                15:3.37,
                17:2.60,
                16:3.00,
                19:3.40,
                18:3.20,
                31:3.60,
                36:3.50,
                32:3.89,
                33:3.35,
                34:3.35,
                35:2.90,
                61:2.60,
                62:2.90,
                63:4.10,
                64:2.50,
                65:3.82,
                71:1.65,
                72:4.20,
                73:2.50,
                74:2.90,
                75:3.10,
                81:5.67,
                82:3.12,
                94:3.40,
                91:2.50,
                76:1.67,
                51:3.60,
                52:2.90,
                53:2.20
	}
	if (year.classed('selected')) {
		d3.select('g#legend').classed('hidden', false);

		await d3.json(baseURL + 'inflation' + (id ? '/' + id : '')).then((result) => {
			
			if(id==undefined){
				result[1561961474000] = 3.46;
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

