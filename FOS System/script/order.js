const loadCustomer = ()=>{

    $('#order-table-body').empty();


    const fireStore = firebase.firestore();

    fireStore
    .collection('orders')
    .get().then((result)=>{
        result.forEach((records) => {
            const data = records.data();

            const row = `
            <tr>
            <td>${records.id}</td>          //id manage the firebase
            <td>${data.customer.name}</td>
            <td>${data.orderDate}</td>
            <td>${data.totalCost}</td>
            
            <td>S
            <button class="btn btn-dark" onclick="printData('${records.id}')">Print</button>
            
             </td>
            </tr>`;

            $('#order-table-body').append(row);
            
        });
    });
}


const printData = (id)=>{
    window.open(`order-details-page.html?id=${id}`);
     
}