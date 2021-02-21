this.getProducts();
this.filterPrice();
var products = [];
console.log(rawdata)

// Mike's code start
// const testfunction = (datas) => {
// 	const categoryIdArray = datas.map(data => data.categoryId)
// 	const categoryArray = datas.map(data => data.category)
// 	let categoryContent = `<option value=0>All hires</option>`
// 	console.log(categoryIdArray)
// 	console.log(categoryArray)

// 	categoryArray.forEach((cate, index) => {
// 		if(cate && cate.categoryId) {
// 			let x = categoryIdArray.indexOf(cate.categoryId)
// 			if (x == index) {
// 				categoryContent +=
// 				`<option value="` + cate.categoryId + `">` + cate.categoryName + `</option>`
// 			}
// 		}
// 	})
// 	document.getElementById('category').innerHTML = categoryContent
// }

// testfunction(rawdata)
// Mike's code finish

// Bella's code start
// let id = [];
// let newId = [];
let category = [];
let newCategory = [];
let showCategory =[];
// Find out all category and put into array category
for(let i = 0; i <= rawdata.length; i ++){
	if(rawdata[i] && rawdata[i].category){
		category.push(rawdata[i].category);
	}
}
console.log(category);
// Unique the category to newCategory
// Method 1 start
this.unique(category)
function unique(category){
	let unique1 = {};
	category.forEach(function(item){
		// console.log(item);
	  unique1[JSON.stringify(item)]=item;//键名不会重复
	})
	newCategory = Object.keys(unique1).map(function(u){ 
	//Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
	  return JSON.parse(u);
	})
	return newCategory;
  }
  console.log(newCategory)
//   Method 1 finished

// //Find out all categoryId and put into arry id
// for (let i = 0; i <= rawdata.length; i++) {
// 	if (rawdata[i] && rawdata[i].categoryId) {
// 		id[i] = rawdata[i].categoryId;
// 	}
// }
// // Make id unique to newId
// this.unique1(id);
// function unique1() {
// 	for (i = 0; i <= id.length; i++) {
// 		if (id[i]) {
// 			if (newId.indexOf(id[i]) === -1) {
// 				newId.push(id[i]);
// 			}
// 		}
// 	}
// 	return newId;
// }
// console.log(newId);
//

// Method 1:
showCategory = `<option value=0>All hires</option>`
newCategory.forEach((kate)=> {
		showCategory = showCategory +
		`<option value="` + kate.categoryId + `">` + kate.categoryName + `</option>`
	console.log(showCategory);
})
this.interHtml();
function interHtml() {
	document.getElementById('category').innerHTML = showCategory;
}

//Method 2:（not working question why?)
// newCategory.forEach((kate)=> {
// 	let opt  = document.createElement('option');
// 	opt.value = kate.categoryId;
// 	opt.text = kate.categoryName;
// 	console.log(opt);
// 	showCategory += opt;
// 	console.log(showCategory);
// })
// this.interHtml();
// function interHtml() {
// 	showCategory = document.getElementById('category').innerHTML;
// }


// Find out all categoryname which match x and put into a array xName
// for (i = 0; i <= rawdata.length; i++) {
// 	for (let Id of newX) {
// 		if (rawdata[i] && rawdata[i].categoryId && rawdata[i].categoryId == Id) {
// 			xName.push(rawdata[i].category.categoryName);
// 		}
// 	}
// }
// console.log(xName);
// // Make xName unique to newName
// this.uniqueName(xName);
// function uniqueName() {
// 	for (i = 0; i <= xName.length; i++) {
// 		if (xName[i]) {
// 			if (newName.indexOf(xName[i]) == -1) {
// 				newName.push(xName[i]);
// 			}
// 		}
// 	}
// 	return newName;
// }
// console.log(newName);
// Bella's code finish


// Displayproduct shall be executed piror to ALL methods
function getProducts() {
	products = []
	let category = document.getElementById("category").value;
	console.log(category);
	for (let product of rawdata) {
		if (product.categoryId == category || category == "0") {
			// This need to push "y" or the object
			products.push(product);
		}
	}
	this.allProducts();
}

function filterPrice() {
	products = []
	let a = document.getElementById("price").value;
	console.log(a);
	for (let b of rawdata) {
		if (a == 0) {
			products.push(b);
		}
		if (b.price <= 100 && a == 100) {
			products.push(b);
		}
		if (b.price > 100 && b.price <= 500 && a == 500) {
			products.push(b);
		}
		if (b.price > 500 && b.price <= 1000 && a == 1000) {
			products.push(b);
		}
		if (b.price > 1000 && a == 1001) {
			products.push(b);
		}
	}
	this.allProducts();
}

function lowtohigh() {
	rawdata.sort(function (objectA, objectB) {
		var valueA = objectA.price;
		var valueB = objectB.price;;
		if (valueB < valueA) return 1;
		else if (valueB > valueA) return -1;
		else return 0;
	})
	this.filterProduct();
}

function hightolow() {
	rawdata.sort(function (objectC, objectD) {
		var valueC = objectC.price;
		var valueD = objectD.price;
		if (valueC < valueD) return 1
		else if (valueC > valueD) return -1
		else return 0;
	})
	this.filterPrice();
}

function allProducts() {
	let screenplay = ""
	// this needs to loop through the filtered datas, not the original raw data
	for (let x of products) {
		if (x.productMedia[0] && x.productMedia[0].url) {
			let imgUrl = "https://storage.googleapis.com/luxe_media/wwwroot/" + x.productMedia[0].url;
			let urlParams = "./Detail.html?prodId=" + x.prodId + "&prodTitle=" + x.title;
			screenplay = screenplay +
				`<div class="col-12 col-md-2 mb-3">
					<a href="` + urlParams + `" style="color: grey;">
						<img style="width: 100%; height: 200px; display: block" src="`+ imgUrl + '">' +
				`<div style="width: 85%">` + x.title + "</div>" + '$ ' + x.price +
				`</a>
				</div>`
		}
	}
	document.getElementById("display").innerHTML = screenplay;
}