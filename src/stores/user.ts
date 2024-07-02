import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  "user",
  () => {
    const userData = ref({
      username: "",
      tel: "",
    });
    function setUserData(username:string,tel:string) {
      userData.value.username = username;
      userData.value.tel = tel;
    }
    function clearUserData() {
      userData.value.username = "";
      userData.value.tel = "";
    }
    return { userData, setUserData, clearUserData };
  },
  {
    persist: true,
  }
);
