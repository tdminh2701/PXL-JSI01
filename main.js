console.log("lien ket js")
fetch("https://649ed155245f077f3e9cf127.mockapi.io/products")
.then(function(res){
    return res.json()   
})
.then(function(data){
    console.log(data)
    document.getElementById("productList").innerHTML = `
    <div class="col-3">
                <div class="productItem card border-0 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${data[7].image}">
                    <div class="card-body">
                        <h5 class="card-title">${data[7].name}</h5>
                        <span class="phone-Value text-primary">${data[7].sellPrice}</span>
                        <span class="phone-Exvalue text-decoration-line-through">${data[7].orPrice}</span>
                        <button class="btn btn-primary">Buy product</button>
                    </div>
                </div>
            </div>
    `
})
