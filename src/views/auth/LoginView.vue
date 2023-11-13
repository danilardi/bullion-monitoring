<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const $router = useRouter();
const $toast = useToast();
const authStore = useAuthStore();
const form = ref(null);
const formModel = ref({
  username: "operator",
  password: "1qAzxSw2",
  clientCaptchaKey: null,
});

function handleLogin() {
  if (form.value.checkValidity()) {
    authStore
      .login(formModel.value.username, formModel.value.password, null)
      .then(() => {
        $router.push({ path: "/" });
        $toast.success("Sukses Login", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      });
  }
}

function logout() {
  authStore.logout();
}
</script>

<template>
  <section class="d-flex vh-100" style="background-color: #f2edf3">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div
                class="col-md-6 col-lg-5 d-flex align-self-center justify-content-center"
              >
                <img
                  src="../../assets/logo.svg"
                  alt="login form"
                  class="img-fluid ms-3"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form
                    v-on:submit.prevent
                    ref="form"
                    class="needs-validation"
                    novalidate
                  >
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="bi bi-stack me-2 logo"></i>
                      <span class="h1 fw-bold mb-0">Bullion Monitoring</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Sign into your account
                    </h5>

                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        v-model="formModel.username"
                        required
                      />
                      <label class="form-label" for="username">Username</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        v-model="formModel.password"
                        required
                      />
                      <label class="form-label" for="password">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-success btn-lg btn-block"
                        type="submit"
                        @click.prevent="handleLogin"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
