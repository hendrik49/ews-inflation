let month, year;

function initSelector(target) {
	return new Promise(async (resolve, reject) => {
		let bbox			= target.node().getBBox();

		let canvasWidth		= bbox.width * .5;
		let canvasHeight	= bbox.height * .2;

		let canvas			= target.append('g').attr('id', selector_id).attr('transform', 'translate(0,0)');

		year	= canvas.append('g').attr('id', 'year').attr('class', 'cursor-pointer selection').attr('transform', 'translate(' + (canvasWidth / 10 * 2)  + ',' + (canvasHeight / 2) + ')');
		month	= canvas.append('g').attr('id', 'month').attr('class', 'cursor-pointer selection').attr('transform', 'translate(' + (canvasWidth / 10 * 2 + 180)  + ',' + (canvasHeight / 2) + ')');

		year.append('rect').attr('width', 160).attr('height', 80).attr('x', -80).attr('y', -45).style('fill', 'transparent');
		month.append('rect').attr('width', 160).attr('height', 80).attr('x', -80).attr('y', -45).style('fill', 'transparent');

		year.append('text').attr('alignment-baseline', 'middle').attr('text-anchor', 'middle').html('Y<tspan> on </tspan>Y');
		month.append('text').attr('alignment-baseline', 'middle').attr('text-anchor', 'middle').html('M<tspan> to </tspan>M');

		year.classed('selected', true);

		year.on('click', onClick);
		month.on('click', onClick);

		resolve();
	});
}

function onClick() {
	let current	= d3.select(this);
	
	if (d3.select('.selection.selected').attr('id') !== current.attr('id') && !fetching) {
		d3.select('.selection.selected').classed('selected', false);
		current.classed('selected', true);

		if (current.attr('id') == 'year') {
			d3.json(baseURL + 'colors').then((result) => { 
				result = {
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
				_.chain(result).map((val, id) => ({ id, color: states[_.chain(limits).filter(o => (o <= val)).size().value()] })).groupBy('color').mapValues(o => _.map(o, 'id')).forEach((val, key) => { d3.selectAll(val.map(o => ('#prov-' + o)).join(', ')).classed(key, true) }).value() 
			})
		} else {
			d3.selectAll('.province').classed('inflation warning deflation', false);
		}

		refreshValues();
	}
}

