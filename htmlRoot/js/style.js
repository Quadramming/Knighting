QQ.Style.set('red', {color: '#ff0000'});

QQ.Style.set('default', {
	baseLine: 'middle',
	fontSize: 5,
	color: '#6d543a',
	font: 'KenFuture'
});
QQ.Style.set('noborder', {border: false});
QQ.Style.set('unclickable', {isClickable: false});


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
