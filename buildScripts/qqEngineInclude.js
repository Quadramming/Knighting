// Fill index.html with scripts of QQ Engine

//================================================================
// Settings
//================================================================

const index   = 'htmlRoot/index.html';
const include = 'htmlRoot/js/qqengine/includeOrder';

//================================================================
// Code
//================================================================

const fs      = require('fs');

let scripts   = fs.readFileSync(include,   'utf-8');
scripts       = scripts.replace(/\n$/mg,   '');
scripts       = scripts.replace(/^/gm,     '\t\t\t<script src=\'js/qqengine/');
scripts       = scripts.replace(/$/gm,     '\'></script>');

const re      = /(<!-- qqEnging -->)[\S\s]*?(<!-- \/qqEnging -->)/;
let   content = fs.readFileSync(index, 'utf-8');
content       = content.replace(re, '$1\n' + scripts + '\n\t\t$2');

fs.writeFileSync(index, content, {
	encoding : 'utf-8',
	flag     : 'w'
});

