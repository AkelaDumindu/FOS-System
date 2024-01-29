    const loadData = ()=>{
    const params = {};
    // const queryParameters = window.location.search.substring(1);
    // const arr = queryParameters.splits(&)
    const queryParameters =new URLSearchParams(window.location.search);
    const id = queryParameters.get('id');
    addEventListener;
    

   
    const firestore = firebase.firestore();

    firestore
    .collection('orders')
    .doc(id)
    .get()
    .then((results)=>{
        if (results.exists) {

            const data = results.data();

            
            

            //*****************ORDER DATA */

            const orderRow = `
            <tr>
            <td>${results.id}</td>          
            <td>${data.orderDate}</td>
            <td>${data.totalCost}</td>
            
            <td>`;
            $('#order-table-body').append(orderRow);
            //************CUSTOMER DATA */

            const customerRow = `
            <tr>
            <td>${data.customer.customerId}</td>          
            <td>${data.customer.name}</td>
            <td>${data.customer.address}</td>
            <td>${data.customer.sallary}</td>
            
            <td>`;
            $('#customer-table-body').append(customerRow);


            //************ITEM DATA  */

            data.items.forEach(record => {
                const itemRow = `
                    <tr>
                        <td>${record.code}</td>          
                        <td>${record.description}</td>
                        <td>${record.quantity}</td>
                        <td>${record.unitPrice}</td>
                        <td>${record.totalCost}</td>
                    </tr>`;
                $('#items-table-body').append(itemRow);
            });
            print();

           
            
        }
    });

}