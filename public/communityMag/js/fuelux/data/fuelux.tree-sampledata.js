var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.ejs and examples/treeview.js for more info
};

var tree_data = {
	'for-sale' : {name: '便民服务', type: 'item'}	,
	'vehicles' : {name: '工作人员管理', type: 'item'}	,
	'rentals' : {name: '便捷通道', type: 'folder'}	,
	'real-estate' : {name: '社区管理', type: 'folder'}	,
	'pets' : {name: '社区分布', type: 'folder'}	,
	'tickets' : {name: '角色管理', type: 'item'}	,
	'services' : {name: '权限管理', type: 'item'}	,
	'personals' : {name: '物业管理', type: 'item'}
}
// tree_data['for-sale']['additionalParameters'] = {
// 	'children' : {
// 		'appliances' : {name: '便民服务', type: 'item'}
// 		// 'arts-crafts' : {name: 'Arts & Crafts', type: 'item'},
// 		// 'clothing' : {name: 'Clothing', type: 'item'},
// 		// 'computers' : {name: 'Computers', type: 'item'},
// 		// 'jewelry' : {name: 'Jewelry', type: 'item'},
// 		// 'office-business' : {name: 'Office & Business', type: 'item'},
// 		// 'sports-fitness' : {name: 'Sports & Fitness', type: 'item'}
// 	}
// }
// tree_data['vehicles']['additionalParameters'] = {
// 	'children' : {
// 		'cars' : {name: '工作人员管理', type: 'folder'}
// 		// 'motorcycles' : {name: 'Motorcycles', type: 'item'},
// 		// 'boats' : {name: 'Boats', type: 'item'}
// 	}
// }
// tree_data['vehicles']['additionalParameters']['children']['cars']['additionalParameters'] = {
// 	'children' : {
// 		'classics' : {name: 'Classics', type: 'item'},
// 		'convertibles' : {name: 'Convertibles', type: 'item'},
// 		'coupes' : {name: 'Coupes', type: 'item'},
// 		'hatchbacks' : {name: 'Hatchbacks', type: 'item'},
// 		'hybrids' : {name: 'Hybrids', type: 'item'},
// 		'suvs' : {name: 'SUVs', type: 'item'},
// 		'sedans' : {name: 'Sedans', type: 'item'},
// 		'trucks' : {name: 'Trucks', type: 'item'}
// 	}
// }

tree_data['rentals']['additionalParameters'] = {
	'children' : {
		'apartments-rentals' : {name: '一键提报', type: 'item'},
		'office-space-rentals' : {name: '找书记', type: 'item'},
		'vacation-rentals' : {name: '找委员会', type: 'item'},
		'classics' : {name: '找物业', type: 'item'},
		'convertibles' : {name: '找群团', type: 'item'},
		'coupes' : {name: '志愿服务', type: 'item'},
	}
}
tree_data['real-estate']['additionalParameters'] = {
	'children' : {
		'apartments' : {name: '社区信息', type: 'item'}
		// 'villas' : {name: 'Villas', type: 'item'},
		// 'plots' : {name: 'Plots', type: 'item'}
	}
}
tree_data['pets']['additionalParameters'] = {
	'children' : {
		'cats' : {name: '公告管理', type: 'item'},
		'dogs' : {name: '编辑器', type: 'item'},
		'horses' : {name: '文件上传', type: 'item'}
	}
}

var treeDataSource = new DataSourceTree({data: tree_data});











var tree_data_2 = {
	'pictures' : {name: 'Pictures', type: 'folder', 'icon-class':'red'}	,
	'music' : {name: 'Music', type: 'folder', 'icon-class':'orange'}	,
	'video' : {name: 'Video', type: 'folder', 'icon-class':'blue'}	,
	'documents' : {name: 'Documents', type: 'folder', 'icon-class':'green'}	,
	'backup' : {name: 'Backup', type: 'folder'}	,
	'readme' : {name: '<i class="icon-file-text grey"></i> ReadMe.txt', type: 'item'},
	'manual' : {name: '<i class="icon-book blue"></i> Manual.html', type: 'item'}
}
tree_data_2['music']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-music blue"></i> song1.ogg', type: 'item'},
		{name: '<i class="icon-music blue"></i> song2.ogg', type: 'item'},
		{name: '<i class="icon-music blue"></i> song3.ogg', type: 'item'},
		{name: '<i class="icon-music blue"></i> song4.ogg', type: 'item'},
		{name: '<i class="icon-music blue"></i> song5.ogg', type: 'item'}
	]
}
tree_data_2['video']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-film blue"></i> movie1.avi', type: 'item'},
		{name: '<i class="icon-film blue"></i> movie2.avi', type: 'item'},
		{name: '<i class="icon-film blue"></i> movie3.avi', type: 'item'},
		{name: '<i class="icon-film blue"></i> movie4.avi', type: 'item'},
		{name: '<i class="icon-film blue"></i> movie5.avi', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters'] = {
	'children' : {
		'wallpapers' : {name: 'Wallpapers', type: 'folder', 'icon-class':'pink'},
		'camera' : {name: 'Camera', type: 'folder', 'icon-class':'pink'}
	}
}
tree_data_2['pictures']['additionalParameters']['children']['wallpapers']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-picture green"></i> wallpaper1.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> wallpaper2.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> wallpaper3.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> wallpaper4.jpg', type: 'item'}
	]
}
tree_data_2['pictures']['additionalParameters']['children']['camera']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-picture green"></i> photo1.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> photo2.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> photo3.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> photo4.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> photo5.jpg', type: 'item'},
		{name: '<i class="icon-picture green"></i> photo6.jpg', type: 'item'}
	]
}


tree_data_2['documents']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-file-text red"></i> document1.pdf', type: 'item'},
		{name: '<i class="icon-file-text grey"></i> document2.doc', type: 'item'},
		{name: '<i class="icon-file-text grey"></i> document3.doc', type: 'item'},
		{name: '<i class="icon-file-text red"></i> document4.pdf', type: 'item'},
		{name: '<i class="icon-file-text grey"></i> document5.doc', type: 'item'}
	]
}

tree_data_2['backup']['additionalParameters'] = {
	'children' : [
		{name: '<i class="icon-archive brown"></i> backup1.zip', type: 'item'},
		{name: '<i class="icon-archive brown"></i> backup2.zip', type: 'item'},
		{name: '<i class="icon-archive brown"></i> backup3.zip', type: 'item'},
		{name: '<i class="icon-archive brown"></i> backup4.zip', type: 'item'}
	]
}
var treeDataSource2 = new DataSourceTree({data: tree_data_2});