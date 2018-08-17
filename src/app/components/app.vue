<template>
    
    <div>
            <nav class="navbar navbar-expand-md bg-light">
            <a class="navbar-brand" href="./index.html" style="color: black">ToDoListApp</a>
        </nav>

        <div class="container">
            <h2 align="center"> {{ tittle }} </h2><br><br>

            <form @submit.prevent="addTask">
            <div class="input-group">
                <input class="input-group-text" type="text" v-model="task.tittle" placeholder="example: Go to walk" @keyup.enter="addTask"> 
                <button class="btn btn-dark" >Add</button> 
            </div>
            </form>


            <br>
            <table class="table">
                <tr>
                    <th>Tittle</th>
                    <th>Status</th>
                    <th>Complete/Delete</th>
                </tr>
                <tr v-for="(t, index) in Listtasks" v-bind:key="index">
                    <td v-bind:class="{finished: t.status}"> {{ t.tittle }} </td> 
                    <td> {{ t.status ? 'Finished'  : 'To complete'}} </td>
                    <td> 
                        <button class="btn btn-primary" @click="updateTask(t._id,index)"> ✓</button>
                        <button class="btn btn-danger"  @click="deleteTask(t._id)">X</button> 
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>

    class Tasks
    {
        constructor()
        {
            this.tittle = '';
            this.status = false
        }
    }

export default {
    data() 
    {
        return {
            tittle: 'ToDo List',
            task: new Tasks(),
            Listtasks: []
        }
    },
    methods: {
        addTask: function()
        {   
            if(this.task.tittle.trim() != '')
            {
                fetch('/api/tasks',
                {
                    method: 'POST',
                    body: JSON.stringify( this.task),
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => res.json()).then( data => {
                    console.log(data);
                    this.getData();
                    this.task = new Tasks();
                });
            }
        },
        deleteTask: function(id)
        {
            // this.Listtasks.splice(id,1);
            fetch('/api/tasks/'+id,
            {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json()).then( data => 
            {
                console.log(data);
                this.getData();
            });
        },
        updateTask: function(id,index)
        {
            var t = this.Listtasks[index];
            t.status = !this.Listtasks[index].status;
            
            fetch('/api/tasks/'+id,
            {
                method: 'PUT',
                body: JSON.stringify( t),
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            }).then(res => res.json()).then( data => {
                console.log(data);
                this.getData();
            });
        },
        getData: function(){
            fetch('/api/tasks').then(res => res.json().then(data=> {
                this.Listtasks = data
            }));  
        }
    },
    mounted: function(){
        this.getData();
    }
}
</script>

<style>
.finished{
    color: gray;
    text-decoration: line-through;
}
a{
    color:black;
}
</style>
