// add data for customers table

const createCustomer = ()=>{
    const tempCustomer = {
        name: $('#name').val(),
        address: $('#address').val(),
        sallary: $('#sallary').val()

    }

  

    console.log(tempCustomer);

    const database = firebase.firestore();
    database.collection('customers')
    .add(tempCustomer)
    .then((response)=>{
        console.log(response);

    }).catch((error)=>{

        console.log(error);
    });

}


// get data from customer's table

const loadCustomer = ()=>{

    $('#table-body').empty();


    const fireStore = firebase.firestore();

    fireStore
    .collection('customers')
    .get().then((result)=>{
        result.forEach((records) => {
            const data = records.data();

            const row = `
            <tr>
            <td>${records.id}</td>          //id manage the firebase
            <td>${data.name}</td>
            <td>${data.address}</td>
            <td>${data.sallary}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteData('${records.id}')">Delete</button>
            <button class="btn btn-success" onclick="updateData('${records.id}')">Update</button>
             </td>
            </tr>`;

            $('#table-body').append(row);
            
        });
    });
}


// Global variable to store the customer ID
let customerId = undefined;

// Function to update data based on customer ID
const updateData = (id) => {
    customerId = id;

    const firestore = firebase.firestore();
    firestore
        .collection('customers')
        .doc(customerId)
        .get()
        .then((response) => {
            if (response.exists) {
                const data = response.data();
                $('#name').val(data.name);
                $('#address').val(data.address);
                $('#sallary').val(data.sallary);
            }
        })
        .then(() => {
            // Assuming loadCustomer is a function you've defined to load customers
            loadCustomer();
        });
}

// Function to update a customer record
const updateRecord = () => {
    if (customerId) {
        const firestore = firebase.firestore();
        firestore
            .collection('customers')
            .doc(customerId)
            .update({
                name: $('#name').val(),
                address: $('#address').val(),
                sallary: $('#sallary').val()
            })
            .then(() => {
                customerId = undefined;
                // Assuming loadCustomer is a function you've defined to load customers
                loadCustomer();
            });
    }
}



// delete data
const deleteData = (id)=>{
    
    if(confirm('Are you sure')){
        
    firestore = firebase.firestore();

    firestore
    .collection('customers')
    .doc(id)
    .delete()
    .then(()=>{
        toastr.success('Have fun storming the castle!', 'Miracle Max Says');
        loadCustomer();
        customerId = undefined;
    })
    }


}