<template>
  <div class="auth-main">
    <form @submit.prevent="registration" class="from_user">
      <h1>Sign in</h1>

      <label>Name</label>
      <input
        class="model"
        v-model.trim="UserName"
        type="text"
        placeholder="Name"
      />
      <label>Phone</label>
      <input
        class="model"
        v-model.trim="phone"
        type="text"
        placeholder="Phone"
      />
      <label>password</label>
      <input
        class="model"
        v-model.trim="password"
        type="password"
        placeholder="password"
      />

      <button type="submit">Registrstsion</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      UserName: "",
      password: "",
    };
  },
  methods: {
    registration() {
      let data = {
        phone: this.phone,
        UserName: this.UserName,
        password: this.password,
      };
      this.$store
        .dispatch("registratsion", data)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="css" scoped>
.from_user {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.model {
  width: 250px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid teal;
  border-radius: 8px;
}
</style>