function getUrlParams(paramName) {
  const url = window.location.search.substring(1);
  const urlParams = new URLSearchParams(url);
  return urlParams.get(paramName);
}

function getProduct(Id) {
  let target;
  for (let prod of rawdata) {
    if (prod.prodId == Id) {
     return target = prod
    }
  }
  return target;
}

let prodId = parseInt(getUrlParams('prodId'));
let prodTitle = getUrlParams('prodTitle');
let currentProd = getProduct(prodId);
console.log(currentProd);
document.getElementById('prodId').innerHTML = 'Product ID: ' + prodId;
document.getElementById('prodTitle').innerHTML = prodTitle;
let imgUrl = "https://storage.googleapis.com/luxe_media/wwwroot/" + currentProd.productMedia[0].url;
document.getElementById('prodImg').innerHTML = '<img src="' + imgUrl + '" width="100%" height="200px">';