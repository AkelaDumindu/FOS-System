// function Customer(name, address, sallary) {
//     this.name = name;
//     this.address = address;
//     this.sallary = sallary;
    
// }

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
            console.log(respon);

        }).catch((error)=>{

            console.log(error);
        });
}