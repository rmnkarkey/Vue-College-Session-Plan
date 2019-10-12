//  save () {
//         if (this.editedIndex > -1) {
//           console.log('edited data');
//           console.log(this.editedItem);
          
//           axios.put('/contact/'+this.editedItem.id,{name:this.editedItem.fullName, phone: this.editedItem.mobile})
//           .then(response=>{
//             console.log(response);
            
//           })
          
//           Object.assign(this.contacts[this.editedIndex], this.editedItem)
//         } else {
//           console.log('created data');
//           console.log(this.editedItem);
//            axios.post('/contact',{name:this.editedItem.fullName, phone: this.editedItem.mobile})
//           .then(response=>{
//             console.log(response);
            
//           })
//           this.contacts.push(this.editedItem)
//         }
//         this.close()
//       }
<template>
     
</template>
