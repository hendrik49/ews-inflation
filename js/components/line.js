let roam, xScale, yScale, line, detail, tooltip;

const pathWidth	= .675;

const ceil_size		= 75;
const floor_size	= 12;

function initLine(target) {
	return new Promise(async (resolve, reject) => {
		let bbox			= target.node().getBBox();

		let canvasWidth		= bbox.width * .5;
		let canvasHeight	= bbox.height * .2;

		let margin 			= { top: 50, right: (canvasWidth * (1 - pathWidth)), bottom: 50, left: 20 };
		let width			= canvasWidth - margin.right - margin.left;
		let height			= canvasHeight - margin.top - margin.bottom;

		roam 				= target.append('g').attr('id', line_id).attr('transform', 'translate(' + ((bbox.width - canvasWidth) + margin.left) + ',' + margin.top + ')');

		let mock			= _.chain(13).range().map((o) => ({ month: moment().subtract(o, 'months').startOf('month').toDate(), inf: 0 })).value();

		xScale				= d3.scaleTime().domain([d3.min(mock, (o) => (o.month)), d3.max(mock, (o) => (o.month))]).range([0, width]);
		yScale				= d3.scaleLinear().domain([_.floor(d3.min(mock, (o) => (o.inf))), _.ceil(d3.max(mock, (o) => (o.inf)))]).range([height, 0]);

		line				= d3.line().x((o) => (xScale(o.month))).y((o) => (yScale(o.inf))).curve(d3.curveCatmullRom);

		roam.append('rect')
			.attr('id', 'line-back')
			.attr('width', canvasWidth)
			.attr('height', canvasHeight)
			.attr('transform', 'translate(' + -margin.left + ',' + -margin.top + ')');

		roam.append('path')
			.attr('id', 'line')
			.attr('d', line(mock));

		tooltip	= roam.append('g')
			.attr('id', 'tooltip-wrapper')
			.attr('class', 'hidden');

		tooltip.append('text')
			.attr('text-anchor', 'middle');

		tooltip.append('rect')
			.attr('rx', '5')
			.attr('ry', '5');

		roam.append('g')
			.attr('id', 'dot-wrapper')
			.selectAll('.dot').data(mock).enter().append('circle')
				.attr('class', 'dot')
				.attr('cx', (o) => (xScale(o.month)))
				.attr('cy', (o) => (yScale(o.inf)))
				.attr('r', 5);

	        img = roam.append("a")
			.attr("href", "dashboard-daya-beli.html")
			.append("svg:image")
			.attr('y', 500)
			.attr('x', 370)
			.attr('width', 200)
			.attr('height', 100)
			.attr("xlink:href", "");

		detail	= roam.append('g')
			.attr('id', 'detail-wrapper');

		detail.append('text')
			.attr('id', 'ceil')
			.attr('font-size', ceil_size + 'px')
			.attr('y', ceil_size+80)
			// .attr('alignment-baseline', 'hanging')
			.text('0');
		
		detail.append('text')
			.attr('id', 'floor')
			.attr('font-size', floor_size + 'px')
			.attr('text-anchor', 'end')
			.attr('y', ceil_size + floor_size + 90)
			.attr('x', ceil_size + 50)
			.text(moment().format('MMMM YYYY'));

		detail.append('text')
			.attr('id', 'floor2')
			.attr('font-size', floor_size + 'px')
			.attr('text-anchor', 'end')
			.attr('y', ceil_size + floor_size + 120)
			.attr('x', ceil_size + 50)
			.text(moment().format('MMMM YYYY'));
		
		detail.append('text')
			.attr('id', 'floor3')
			.attr('font-size', floor_size + 'px')
			.attr('text-anchor', 'end')
			.attr('y', ceil_size + floor_size + 230)
			.attr('x', ceil_size + floor_size)
			.text(moment().format('MMMM YYYY'));
		
		detail.
			append("rect")  
			.attr('y', ceil_size + floor_size + 250)
			.attr('x', ceil_size-190)
			.attr("height", 50)
			.attr("width", 75)
			.style("fill", "darkslategrey");

		detail.append('text')
			.attr('id', 'floor3')
			.attr('font-size', 2*floor_size + 'px')
			.attr('y', ceil_size + floor_size + 280)
			.attr('x', ceil_size-185)
			.text(3.12).append('tspan')
			.text('(2016)')
			.style('font-size', floor_size-3 + 'px')
			.attr('dx', '.1em')
			.attr('dy', '.9em');

		detail.append("rect")  
			.attr('y', ceil_size + floor_size + 250)
			.attr('x', ceil_size-105)
			.attr("height", 50)
			.attr("width", 80)
			.style("fill", "darkslategrey");

		detail.append('text')
			.attr('id', 'floor4')
			.attr('font-size', 2*floor_size + 'px')
			.attr('text-anchor', 'end')
			.attr('y', ceil_size + floor_size + 280)
			.attr('x', ceil_size-30)
			.text(3.75).append('tspan')
			.text('(2017)')
			.style('font-size', floor_size-3 + 'px')
			.attr('dx', '.1em')
			.attr('dy', '.9em');

		detail.
			append("rect")  
			.attr('y', ceil_size + floor_size + 250)
			.attr('x', ceil_size-15)
			.attr("height", 50)
			.attr("width", 80)
			.style("fill", "darkslategrey");

		detail.append('text')
			.attr('id', 'floor5')
			.attr('font-size', 2*floor_size + 'px')
			.attr('text-anchor', 'end')
			.attr('y', ceil_size + floor_size + 280)
			.attr('x', ceil_size + floor_size + 50)
			.text(3.49)
			.append('tspan')
			.text('(2018)')
			.style('font-size', floor_size-3 + 'px')
			.attr('dx', '.1em')
			.attr('dy', '.9em');

		detail.append('text')
			.attr('id', 'ceilb')		
			.attr('font-size', ceil_size + 'px')
			.attr('y', 280)
			.text('0');	

		detail.attr('transform', 'translate(' + (canvasWidth * (pathWidth)) + ',' + (yScale(_.chain(mock).maxBy('month').get('inf').value()) - detail.node().getBBox().height / 2) + ')');

		resolve();
	});
}

formatPower = function(d) { 
	return (d + "").split("").map(function(c) { return superscript[c]; }).join(""); };

function updateLine(result) {

	let data 	= _.chain(result).map((value, key) => ({ month: moment(parseInt(key)).startOf('month').toDate(), inf: value })).orderBy('month', 'desc').value();
	let last	= d3.max(data, (o) => (o.month));

	xScale.domain([d3.min(data, (o) => (o.month)), last]);
	yScale.domain([_.floor(d3.min(data, (o) => (o.inf))), _.ceil(d3.max(data, (o) => (o.inf)))]);

	let selector	= roam.transition(def_transtn).duration(def_duration);

	selector.select('path#line')
		.attr('d', line(data));

	let circles	= roam.select('g#dot-wrapper').selectAll('.dot').data(data);

	circles.exit().remove();
	circles.enter().append('circle')
		.attr('class', 'dot')
		.attr('cx', (o) => (xScale(o.month)))
		.attr('r', 5);

	circles.transition(def_transtn).duration(def_duration)
		.attr('cy', (o) => (yScale(o.inf)));

	circles
		.on('mouseover', onMouseOver)
		.on('mouseout', onMouseOut);

	let inf_value	= _.chain(data).maxBy('month').get('inf').round(2).value().toFixed(2);
	var format = d3.format(".2f");
        last =  moment().subtract(1, 'months').format('MMMM YYYY');

	detail.select('text#ceil').text(inf_value);
	detail.select('text#ceilb').text(format(3.36));
	detail.select('text#floor').text('').text('Prediksi untuk ' +last);
	detail.select('text#floor2').text('').text('Prediksi untuk ' + new moment().month(11).format('MMMM YYYY'));
	detail.select('text#floor3').text('Realisasi (%YoY)');

	if (year.classed('selected')) {
		detail.classed('warning', inf_value > limit_warn && inf_value < limit_top);
		detail.classed('inflate', inf_value > limit_top);
		detail.classed('deflate', inf_value < limit_btm);
	}

	let transform	= detail.attr('transform').split(',')[0] + ',' + (yScale(_.chain(data).maxBy('month').get('inf').value()) - detail.node().getBBox().height / 2) + ')';
	selector.select('g#detail-wrapper').attr('transform', transform);
}

function onMouseOver(o) {
	let text	= tooltip.select('text');
	let rect	= tooltip.select('rect');

	text.text(moment(o.month).format('MMMM YYYY') + ': ' + _.round(o.inf, 2));

	let rectWidth	= text.node().getBBox().width + 25;
	let rectHeight	= text.node().getBBox().height + 10;

	rect
		.attr('width', rectWidth)
		.attr('height', rectHeight)
		.attr('x', -(rectWidth / 2))
		.attr('y', -(rectHeight - 9));

	tooltip.attr('transform', 'translate(' + xScale(o.month) + ',' + (yScale(o.inf) - rectHeight + 5) + ')');

	tooltip.classed('hidden', false);
}

function onMouseOut() {
	tooltip.classed('hidden', true);
}

