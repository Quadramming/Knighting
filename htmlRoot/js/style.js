QQ.Style.set('red', {color: '#FF0000'});
QQ.Style.set('green', {color: '#00FF00'});

QQ.Style.set('default', {
	baseLine: 'middle',
	fontSize: 50,
	color: '#6d543a',
	font: 'KenFuture'
});
QQ.Style.set('noborder', {border: false});
QQ.Style.set('unclickable', {isClickable: false});

QQ.Style.set('score', {
	style: ['default', 'noborder', 'unclickable'],
	align: 'left',
	valign: 'middle',
	position: new QQ.Point(-14, 17),
	size: new QQ.Size(25, 2),
	z: 20
});

QQ.Style.set('levels', {
	style: ['default', 'noborder', 'unclickable'],
	align: 'center',
	valign: 'middle',
	anchor: new QQ.Point(0.5, 0.5),
	position: new QQ.Point(0, -6),
	size: new QQ.Size(20, 2),
	z: 20
});

QQ.Style.set('bubbles', {
	style: ['default', 'noborder', 'unclickable'],
	align: 'center',
	valign: 'middle',
	anchor: new QQ.Point(0.5, 0.5),
	size: new QQ.Size(30, 1.5),
	z: 20
});

QQ.Style.set('checkboxText', {
	size: new QQ.Size(15, 2),
	fontSize: 50,
	align: 'left',
	anchor: new QQ.Point(0, 0.5)
});

QQ.Style.set('text header', {
	style: ['default', 'noborder', 'unclickable'],
	align: 'center',
	valign: 'middle',
	position: new QQ.Point(0, -6),
	anchor: new QQ.Point(0.5, 0.5),
	size: new QQ.Size(20, 3),
	z: 20
});

QQ.Style.set('text dialog', {
	style: ['default', 'noborder', 'unclickable'],
	align: 'left',
	valign: 'top',
	position: new QQ.Point(0, -4),
	anchor: new QQ.Point(0.5, 0),
	size: new QQ.Size(20, 16),
	z: 20
});
