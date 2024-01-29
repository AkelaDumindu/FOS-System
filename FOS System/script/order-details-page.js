const loadDate = ()=>{
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
            <td>${data.orederDate}</td>
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

            data.item.forEach(record => {

                const itemRow = `
                <tr>
                <td>${record.code}</td>          
                <td>${record.description}</td>S
                <td>${record.quantity}</td>
                <td>${record.customer.sallary}</td>
                
                <td>`;
                $('#item-table-body').append(itemRow);
                
    
    
                
            });
            printData();

           
            
        }
    });

}