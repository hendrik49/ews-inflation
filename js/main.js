moment.locale('id');

const provinces	= [{id: "11", name: "Aceh"},{id: "51", name: "Bali"},{id: "19", name: "Bangka Belitung"},{id: "36", name: "Banten"},{id: "17", name: "Bengkulu"},{id: "75", name: "Gorontalo"},{id: "31", name: "Jakarta Raya"},{id: "15", name: "Jambi"},{id: "32", name: "Jawa Barat"},{id: "33", name: "Jawa Tengah"},{id: "35", name: "Jawa Timur"},{id: "61", name: "Kalimantan Barat"},{id: "63", name: "Kalimantan Selatan"},{id: "62", name: "Kalimantan Tengah"},{id: "64", name: "Kalimantan Timur"},{id: "21", name: "Kepulauan Riau"},{id: "18", name: "Lampung"},{id: "81", name: "Maluku"},{id: "82", name: "Maluku Utara"},{id: "52", name: "Nusa Tenggara Barat"},{id: "53", name: "Nusa Tenggara Timur"},{id: "94", name: "Papua"},{id: "91", name: "Papua Barat"},{id: "14", name: "Riau"},{id: "76", name: "Sulawesi Barat"},{id: "73", name: "Sulawesi Selatan"},{id: "72", name: "Sulawesi Tengah"},{id: "74", name: "Sulawesi Tenggara"},{id: "71", name: "Sulawesi Utara"},{id: "13", name: "Sumatera Barat"},{id: "16", name: "Sumatera Selatan"},{id: "12", name: "Sumatera Utara"},{id: "34", name: "Yogyakarta"}];

let inf_ids, def_ids, warn_ids;

let types	= ['Keterjangkauan Harga', 'Ketersediaan Pasokan', 'Kelancaran Distribusi', 'Komunikasi/Koordinasi'];

$( document ).ready(async function() {
	$(' #wordcloud-content ').html(types.map(o => ('<div id="' + _.kebabCase(o) + '" class="horseman"><div class="horseman-title">' + o + '</div><div class="horseman-content"></div></div>')).join(''))
	await initMap();
	await initWordcloud();
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
	});
	refreshValues();
});

$( document ).keyup((e) => {
	if (e.key == "Escape" && $( '#wordcloud-wrapper' ).hasClass('opened')) { onclickWordcloud(); }
});

function opencurtain(flag) {
	$(' #cover ').slideUp();

	year.classed('selected', !flag);
	month.classed('selected', flag);

	if (!flag) { d3.json(baseURL + 'colors').then((result) => { _.chain(result).map((val, id) => ({ id, color: states[_.chain(limits).filter(o => (o <= val)).size().value()] })).groupBy('color').mapValues(o => _.map(o, 'id')).forEach((val, key) => { d3.selectAll(val.map(o => ('#prov-' + o)).join(', ')).classed(key, true) }).value() }); }

	refreshValues();
}

