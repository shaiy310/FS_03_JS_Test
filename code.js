let $table;

$(document).ready(function() {
    $table = $('#storeTable tbody')[0];

    const items = [
        { imageUrl: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-tv-icon-png-image_3568215.jpg", storeName: "Ivory", address: "23 Bialik St", city: "TLV", price: 1200, link: "https://www.tlvmall.com/", rating: 1 },
        { imageUrl: "https://www.clipartmax.com/png/middle/41-410289_png-file-tv-icon-vector-png.png", storeName: "Rock30", address: "123 Main St", city: "NYC", price: 2200, link: "https://www.nyc.gov/main", rating: 3 },
        { imageUrl: "https://www.clipartmax.com/png/middle/41-410289_png-file-tv-icon-vector-png.png", storeName: "KSP", address: "45 Herzel St", city: "Ashdod", price: 1000, link: "https://ashdodnet.com/", rating: 5 },
        { imageUrl: "https://png.pngtree.com/png-clipart/20190516/original/pngtree-tv-icon-png-image_3568215.jpg", storeName: "Market", address: "67 Main St", city: "Jerusalem", price: 1500, link: "https://en.wikipedia.org/wiki/Jerusalem", rating: 1 }
    ];

    items.forEach(item => {
        AddTableRow(item);
    });

    const averagePrice = GetPriceAvg(items);
    const optimalItemId = GetOptimalItemId(items);
    const optimalItem = items[optimalItemId];
    $('#averagePrice').text(`$${averagePrice.toFixed(2)}`);
    $('#optimalPurchaseRow').text(optimalItemId ? `${optimalItem.row}` : 'N/A');
    $('#optimalPurchase').text(optimalItem
        ? `${optimalItem.storeName} ($${optimalItem.price})`
        : 'N/A');

    $('#storeTable tbody').on('click', '.delete-btn', function() {
        $(this).closest('tr').remove();
    });

    $('#storeTable tbody').on('click', '.buy-btn', function() {
        const row = $(this).closest('tr');
        console.log(row);
        const storeName = row.find('#storeName').text();
        const price = row.children().eq(5).text();
        const purchaseUrl = `purchase.html?store=${encodeURIComponent(storeName)}&price=${encodeURIComponent(price)}`;
        window.open(purchaseUrl, '_blank');
    });
});

function colorByRating($row) {
    rating = parseInt($row.find('#rating').text().split('/')[0]);
    console.log($row, 'Rating:', $row.find('#rating').text(), rating);
    $row.removeClass('table-success', 'table-danger', 'table-warning', 'table-info', 'bg-success', 'bg-danger', 'bg-warning');

    if (rating >= 4) {
        $row.addClass('table-success');
    } else if (rating < 2) {
        $row.addClass('table-danger');
    }
}


function AddTableRow(item) {
    var row = document.createElement('tr');
    var index = $table.rows.length + 1;
    item.row = index
    row.innerHTML = `
        <td>${index}</td>
        <td><a href="${item.imageUrl}" target="_blank" rel="noopener noreferrer">
            <img class="img-fluid" src="${item.imageUrl}" alt="${item.storeName}" width="100">
        </a></td>
        <td id="storeName">${item.storeName}</td>
        <td>${item.address}</td>
        <td>${item.city}</td>
        <td>${item.price}</td>
        <td><a href="${item.link}" target="_blank" rel="noopener noreferrer">Visit Store</a></td>
        <td id="rating">${item.rating}/5</td>
        <td><button class="btn btn-danger delete-btn" type="button">Delete</button> <button class="btn btn-primary buy-btn" type="button">Buy</button></td>
    `;
    colorByRating($(row));
    $table.append(row);
    
    return row;
}

function GetPriceAvg(items) {
    var totalPrice = 0;
    items.forEach(item => {totalPrice += item.price; });

    return totalPrice / items.length;
}

function GetOptimalItemId(items) {
    var lowestPrice = Number.MAX_VALUE;
    var optimalItemId = -1;

    items.forEach((item, index) => {
        if ((item.rating > 4) && 
            (item.price < lowestPrice)
        ) {    
            lowestPrice = item.price;
            optimalItemId = index;
        }
    });

    return optimalItemId;
}