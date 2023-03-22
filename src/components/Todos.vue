<template>
  <div class="todos_container">
    <div class="todos_content">
      <h1>To-Dos</h1>
      <ul class="todos_list">
        <li v-for="todo in todos" :key="todo.id">
          <h2>{{ todo.subject }}</h2>
          <p>{{ todo.details }}</p>
          <button @click="toggleTodo(todo)">
            {{ todo.completed ? "Undo" : "Complete" }}
          </button>
          <button @click="deleteTodo(todo)">Delete</button>
        </li>
      </ul>
    </div>

    <div class="add_todo">
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" class="form-control" id="subject" v-model="subject" />
        </div>
        <div class="form-group">
          <label for="details">Details</label>
          <textarea class="form-control" id="details" v-model="details"></textarea>
        </div>
        <div class="form-group">
          <button type="submit">Add To-Do</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tasks
      todos: [],
      subject: "",
      details: "",
    };
  },
  methods: {
    async getData() {
      try {
        // fetch todos
        const response = await this.$http.get(
          "https://todos-backend-9djd.onrender.com/todos/"
        );
        // set the data returned as todos
        this.todos = response.data;
      } catch (error) {
        // log the error
        console.log(error);
      }
    },
    async submitForm() {
      try {
        // Send a POST request to the API
        const response = await this.$http.post(
          "https://todos-backend-9djd.onrender.com/todos/",
          {
            subject: this.subject,
            details: this.details,
            completed: false,
          }
        );
        // Append the returned data to the tasks array
        this.todos.push(response.data);
        // Reset the title and description field values.
        this.subject = "";
        this.details = "";
      } catch (error) {
        // Log the error
        console.log(error);
      }
    },
    async toggleTodo(todo) {
      try {
        // Send a request to API to update the todo
        const response = await this.$http.put(
          `https://todos-backend-9djd.onrender.com/todos/${todo.id}/`,
          {
            completed: !todo.completed,
            subject: todo.subject,
            details: todo.details,
          }
        );
        // Get the index of the task being updated
        let todoIndex = this.todos.findIndex((t) => t.id === todo.id);
        // Reset the tasks array with the new data of the updated todos
        this.todos = this.todos.map((todo) => {
          if (this.todos.findIndex((t) => t.id === todo.id) === todoIndex) {
            return response.data;
          }
          return todo;
        });
      } catch (error) {
        // Log any error
        console.log(error);
      }
    },
    async deleteTodo(todo) {
      // Confirm if one wants to delete the todo
      let confirmation = confirm("Do you want to delete this task?");
      if (confirmation) {
        try {
          // Send a request to delete the todo
          await this.$http.delete(`https://todos-backend-9djd.onrender.com/todos/${todo.id}`);
          // Refresh the tasks
          this.getData();
        } catch (error) {
          // Log any error
          console.log(error);
        }
      }
    },
  },
  created() {
    // Fetch tasks on page load
    this.getData();
  },
};
</script>