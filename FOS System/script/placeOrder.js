let orders = [];

const loadIds = ()=>{

    loadCustomerId();
    loadItemId();
}

const loadCustomerId = ()=>{

    const firestore = firebase.firestore();

    firestore
    .collection('customers')
    .get()
    .then((records)=>{
        records.forEach((results) => {
            const option = $('<option></option>').val(results.id).text(results.id);
            $('#customer-id').append(option);
            
        });

    })
}   




$('#customer-id').on("change", function(){
    const customerId = $(this).val();
    const firestore = firebase.firestore();

    firestore
    .collection('customers')
    .doc(customerId)
    .get()
    .then((results)=>{
        if (results.exists) {

            const data = results.data();
            $('#name').val(data.name);
            $('#address').val(data.address);
            $('#sallary').val(data.sallary);
            


            
        }
    });
});


const loadItemId = ()=>{

    const firestore = firebase.firestore();

    firestore
    .collection('items')
    .get()
    .then((records)=>{
        records.forEach((results) => {
            const option = $('<option></option>').val(results.id).text(results.id);
            $('#item-id').append(option);
            
        });

    })
}   




$('#item-id').on("change", function(){
    const itemId = $(this).val();
    const firestore = firebase.firestore();

    firestore
    .collection('items')
    .doc(itemId)
    .get()
    .then((results)=>{
        if (results.exists) {

            const data = results.data();
            $('#description').val(data.description);
            $('#unitPrice').val(data.unitPrice);
            $('#qtyOnHand').val(data.qtyOnHand);
            


            
        }
    });
});


const addToCart = ()=>{
    const unitPrice = Number.parseInt($('#unitPrice').val());
    const qty = Number.parseInt($('#quantity').val());
    const totalCost = unitPrice*qty;


    const cartObj = {
        "code":$('#item-id').val(),
        "description":$('#description').val(),
        "unitPrice": unitPrice,
        "qtyOnHand": qty,
        "totalCost": totalCost
    }

    orders.push(cartObj);

    $('#cart-body').empty();

    orders.forEach(data=>{
        const row =`
        <tr>
                <td>${data.code}</td>
                <td>${data.description}</td>
                <td>${data.unitPrice}</td>
                <td>${data.qtyOnHand}</td>
                <td>${data.totalCost}</td>
        </tr>`;

        $('#cart-body').append(row);
        
    })
    calculateCost();

}


const calculateCost = ()=>{

   let ttl = 0;

   orders.forEach(data=>{
    ttl+=data.totalCost;

   });
   $('#net-total').val(ttl);

}


const placeOrders = () => {
    const customerId = $('#customer-id').val();
    
    // Provide default values for fields to avoid undefined or null values
    let  obj = {
        customer: {
            customerId: customerId || '',
            name: $('#name').val() || '',
            address: $('#address').val() || '',
            sallary: Number.parseInt($('#sallary').val()) || 0
        },
        orderDate: new Date().toISOString().split('T')[0] || '',
        // totalCost: Number.parseInt($('#net-total').val()) || 0,
        items: [] // Change items to an array
    };

    // Push each item as an object into the items array
    orders.forEach((data) => {
        obj.items.push(data);
    });

    const database = firebase.firestore();
    database.collection('orders')
    .add(obj)
    .then((response)=>{
        console.log(response);

    }).catch((error)=>{

        console.log(error);
    });
}

