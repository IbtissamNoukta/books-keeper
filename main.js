const AddBook={
    // emits : ["submitedBook"],
    template : `
        <div class="row">
            <div class="col-md-6 mx-auto my-4">
                <h3 class="border-bottom py-2">
                    Ajouter un livre
                </h3>
                <form @submit="submitBook">
                    <div class="form-group p-3">
                        <input type="text" class="form-control" 
                        v-model="book.ref"
                        :class="book.ref.length ? validClass : errorClass"
                        placeholder="ref">
                    </div>
                    <div class="form-group p-3">
                        <input type="text" class="form-control" 
                        v-model="book.title"
                        :class="book.title.length ? validClass : errorClass"
                        placeholder="titre">
                    </div>
                    <div class="form-group p-3">
                        <textarea cols="30" rows="5" class="form-control"
                        v-model="book.description"
                        :class="book.description.length ? validClass : errorClass"
                         placeholder="description"></textarea>
                    </div>
                    <div class="form-group p-3">
                        <button type ="submit" class="btn btn-primary">
                            Valider
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `,
    data(){
        return{
           book : {
            ref : "",
            title : "",
            description : ""
           },
           errorClass : "form-control is-invalid",
           validClass : "form-control is-valid",
        };
    },
    methods : {
        submitBook($event){
            //to not refresh(actualiser) form to click on it
            $event.preventDefault();
            //send event to component parent
            this.$emit("submitedBook",this.book);
            setTimeout(()=> {
                this.book = {
                    ref : "",
                    title : "",
                    description : ""
                };
            }, 2000);
        },
    },
};
    
const App={
template : `
    <div class="container">
        <AddBook @submitedBook="addBook" />
        <div class="row">
            <div class="col-md-8 mx-auto">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Ref</th>
                            <th>title</th>
                            <th>description</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book,index) in books" :key="index">
                            <td>{{ book.ref }}</td>
                            <td>{{ book.title }}</td>
                            <td>{{ book.description }}</td>
                            <td>
                                <span @click="removeBook(index)"
                                class="btn btn-danger font-weight-bold"
                                > X </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`,
data(){
    return {
        books : [
            {
                ref : "1",
                title : "vue js 3",
                description : "hhhhhhhhh",
            },
        ]
    };
},
components: {AddBook},
methods : {
    removeBook(index){
        // splice fonction de suppression de js
        this.books.splice(index,1);
    },
    addBook(book){
        // push fonction d'ajoute de JS
        this.books.push(book);
    },
},

};
Vue.createApp(App).mount("#app");