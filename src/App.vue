<template>
  <div id="wrapper">
    <div id="inputs">
      <input type="text" placeholder="Name" v-model="name" />
      <input type="text" placeholder="Surname" v-model="surname" />
      <input type="text" placeholder="Age" v-model="age2" />
      <button @click="insertData()" id="insertButton">Insert</button>
    </div>
    <div id="list">
      <li
        v-for="(el, index) in information"
        :key="index"
        :class="{ minor: el.age < 18, adult: el.age >= 18 }"
      >
        {{ el.firstName }} {{ el.lastName }} {{ el.fullName }} {{ el.age }}
        <button v-if="el.showEdit" id="editButton" @click="startEditing(el)">
          Edit
        </button>
        <button
          v-if="el.showDelete"
          id="deleteButton"
          @click="deleteInformation(index)"
        >
          Delete
        </button>
        <div v-if="el.editing">
          <input type="text" v-model="el.edited.firstName" />
          <input type="text" v-model="el.edited.lastName" />
          <input type="text" v-model="el.edited.age" />
          <button @click="saveData(el)" id="saveButton">Save</button>
          <button @click="cancelEditing(el)" id="cancelButton">Cancel</button>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
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
          fullName: "",
          age: "",
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
          fullName: ", " + this.name + " " + this.surname,
          age: this.age2,
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
      } else {
        alert("You need to fill in all inputs!");
      }
    },
    deleteInformation(index) {
      if (confirm("Do you want to delete this?")) {
        this.information = this.information.filter((el, i) => i != index);
      }
    },
    startEditing(el) {
      el.editing = true;
      el.edited.firstName = el.firstName;
      el.edited.lastName = el.lastName;
      el.edited.age = el.age;
    },
    saveData(el) {
      const editedData = el;
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
      editedData.fullName =
        ", " + editedData.edited.firstName + " " + editedData.edited.lastName;
      editedData.editing = false;
    },
    cancelEditing(el) {
      el.editing = false;
      el.edited.firstName = "";
      el.edited.lastName = "";
      el.edited.age = "";
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
</style>
