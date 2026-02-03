import { shallowReactive } from "vue";

export const userRef = shallowReactive({  // reactive인 객체를 shallowReactive하면 내부 반응성은 사라지지 않음
  name: "홍길동",
  address: {
    city: "서울",
    zip: "12345",
  },
});

export function updateName(newName) {
  userRef.name = newName;
}

export function updateCity(newCity) {
  userRef.address.city = newCity;
}
