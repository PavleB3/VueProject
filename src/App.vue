<template>
  <div id="wrapper" v-if="$route.path !== '/example'">
    <div id="inputs">
      <input type="text" placeholder="Name" v-model="name" />
      <input type="text" placeholder="Surname" v-model="surname" />
      <input type="text" placeholder="Age" v-model="age2" />
      <button @click="insertData()" id="insertButton">Insert</button>
      <RouterLink to="/example" id="link">Example</RouterLink>
    </div>
    <div id="list">
      <li v-for="(el, index) in information" :key="index" :class="{ minor: el.age < 18, adult: el.age >= 18 }">
        {{ nameInformation(el) }}
        <button v-if="el.showEdit" id="editButton" @click="startEditing(index)">
          Edit
        </button>
        <button v-if="el.showDelete" id="deleteButton" @click="deleteInformation(index)">
          Delete
        </button>
        <div v-if="el.editing">
          <input type="text" v-model="el.edited.firstName" />
          <input type="text" v-model="el.edited.lastName" />
          <input type="text" v-model="el.edited.age" />
          <button @click="saveData(index)" id="saveButton">Save</button>
          <button @click="cancelEditing(index)" id="cancelButton">
            Cancel
          </button>
        </div>
      </li>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
      name: "",
      surname: "",
      age2: "",
      information: [
        {
          firstName: "",
          lastName: "",
          age: "",
          fullName: "",
          adult: false,
          showEdit: false,
          showDelete: false,
          editing: false,
          edited: {
            firstName: "",
            lastName: "",
            age: "",
          },
        },
      ],
    };
  },
  methods: {
    insertData() {
      if (this.editing) {
        const editedData = this.information.find((el) => el.editing);
        editedData.firstName = editedData.edited.firstName;
        editedData.lastName = editedData.edited.lastName;
        editedData.age = editedData.edited.age;
        editedData.editing = false;
      } else if (this.name && this.surname && this.age2) {
        this.information.push({
          firstName: this.name,
          lastName: this.surname,
          age: this.age2,
          fullName: this.name + " " + this.surname,
          showEdit: true,
          showDelete: true,
          editing: false,
          edited: {
            firstName: "",
            lastName: "",
            age: "",
          },
        });
        this.name = "";
        this.surname = "";
        this.age2 = "";
      } else if (!this.name || !this.surname || !this.age2) {
        alert("You need to fill in all inputs!");
      }
    },
    deleteInformation(index) {
      if (confirm("Do you want to delete this?")) {
        this.information.splice(index);
      }
    },
    startEditing(index) {
      this.information[index].editing = true;
      this.information[index].edited.firstName =
        this.information[index].firstName;
      this.information[index].edited.lastName =
        this.information[index].lastName;
      this.information[index].edited.age = this.information[index].age;
    },
    saveData(index) {
      const editedData = this.information[index];
      if (
        !editedData.edited.firstName ||
        !editedData.edited.lastName ||
        !editedData.edited.age
      ) {
        alert("You need to fill in all inputs!");
        return;
      }
      editedData.firstName = editedData.edited.firstName;
      editedData.lastName = editedData.edited.lastName;
      editedData.age = editedData.edited.age;
      editedData.fullName = `${editedData.edited.firstName} ${editedData.edited.lastName}`;
      editedData.editing = false;
    },
    cancelEditing(index) {
      this.information[index].editing = false;
      this.information[index].edited.firstName = "";
      this.information[index].edited.lastName = "";
      this.information[index].edited.age = "";
    },
    nameInformation(el) {
      const valuesTojoin = [el.firstName, el.lastName, el.age, el.fullName];
      const validValues = valuesTojoin.filter(
        (value) => value !== "" && value !== null && value !== undefined
      );
      return validValues.join(", ");
    },
  },
};
</script>

<style>
#wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: grey;
  width: 800px;
  height: 100vh;
}

#inputs {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
}

#inputs input {
  border-radius: 5px;
  border: none;
}

#insertButton {
  border-radius: 5px;
  height: 20px;
  width: 70px;
  margin-right: 10px;
  margin-top: 2px;
  border: none;
}

#insertButton:hover {
  color: white;
  background: black;
}

li {
  list-style-type: none;
  font-size: 25px;
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 500;
}

.adult {
  color: green;
}

.minor {
  color: red;
}

#editButton {
  border-radius: 5px;
  border: none;
  width: 50px;
}

#deleteButton {
  border-radius: 5px;
  border: none;
  width: 50px;
  margin-left: 10px;
}

#deleteButton:hover {
  color: white;
  background: black;
}

#editButton:hover {
  color: white;
  background: black;
}

input:focus {
  outline: none;
}

button:hover {
  cursor: pointer;
}

#saveButton {
  margin-left: 10px;
}

#cancelButton {
  margin-left: 5px;
}

#link {
  margin-right: 10px;
  color: white;
  background: blue;
  width: 70px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  background: darkgray;
  cursor: pointer;
}

#link:hover {
  background: black;
}</style>
