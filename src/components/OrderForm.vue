<script setup>
import { reactive, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, numeric } from '@vuelidate/validators'
import { MaskInput } from 'vue-3-mask'

defineProps({
  price: Number
})

const emits = defineEmits(['postFormData'])

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  city: 'Irkutsk',
  address: '',
  apartment: '',
  apartment: '',
  entrance: '',
  floor: '',
  domofon: '',
  payment: 'card'
})

const validationRules = {
  name: { required },
  email: { required, email },
  phone: { required, minLength: minLength(17) },
  city: { required },
  address: { required },
  apartment: { required, numeric },
  entrance: { required, numeric },
  floor: { required, numeric },
  domofon: { required, numeric },
  payment: { required }
}

const v$ = useVuelidate(validationRules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    emits('postFormData', formData)
  } else {
    console.log('error validate')
  }
}

// console.log(v$.name.$error)
// @submit.prevent="emits('postFormData', formData)"
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <div class="flex gap-7 mb-5">
      <div class="h-16">
        <input
          type="text"
          placeholder="Имя"
          class="form__contact-form"
          v-model="formData.name"
          @blur="v$.name.$touch"
        />
        <div v-if="v$.name.$error" class="text-sm text-red-500 px-2 mt-1">Это поле обязательно</div>
      </div>
      <!-- <div>
        <input
          type="tel"
          class="form__contact-form"
          v-model="formData.phone"
          placeholder="(###) ###-####"
        />
      </div> -->
      <div>
        <MaskInput
          class="form__contact-form"
          v-model="formData.phone"
          mask="+7(###) ###-##-##"
          placeholder="+7(___) ___-__-__"
          @blur="v$.phone.$touch"
        />
        <div v-if="v$.phone.$error" class="text-sm text-red-500 px-2 mt-1">
          Номер должен иметь 11 цифр
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          class="form__contact-form"
          v-model="formData.email"
          @blur="v$.email.$touch"
        />
        <div v-if="v$.email.$error" class="text-sm text-red-500 px-2 mt-1">
          Неправильный формат email
        </div>
      </div>
    </div>
    <h3 class="text-3xl font-medium mb-7">Доставка</h3>
    <div class="w-2/5">
      <div class="mb-8">
        <select v-model="formData.city" class="form__city-form">
          <option value="Irkutsk" selected>Иркутск</option>
          <option value="Angarsk">Ангарск</option>
          <option value="Shelehov">Шелехов</option>
        </select>
        <!-- <input
          type="text"
          placeholder="Город"
          class="form__delivery-form"
          v-model="formData.city"
        /> -->
      </div>
      <div class="mb-8">
        <input
          type="text"
          placeholder="Адрес,улица,номер дома"
          class="form__delivery-form form__adress-form"
          v-model="formData.address"
        />
      </div>
      <div class="flex gap-5 mb-2">
        <div class="form__adress-wraper">
          <input
            type="text"
            placeholder="Квартира"
            class="form__delivery-form"
            v-model="formData.apartment"
            @blur="v$.apartment.$touch"
          />
          <div v-if="v$.apartment.$error" class="text-sm text-red-500 px-2 mt-1">
            Должно быть числом
          </div>
        </div>
        <div class="form__adress-wraper">
          <input
            type="text"
            placeholder="Подъезд"
            class="form__delivery-form"
            v-model="formData.entrance"
            @blur="v$.entrance.$touch"
          />
          <div v-if="v$.entrance.$error" class="text-sm text-red-500 px-2 mt-1">
            Должно быть числом
          </div>
        </div>
      </div>

      <div class="flex gap-5 mb-2">
        <div class="form__adress-wraper">
          <input
            type="text"
            placeholder="Этаж"
            class="form__delivery-form"
            v-model="formData.floor"
            @blur="v$.floor.$touch"
          />
          <div v-if="v$.floor.$error" class="text-sm text-red-500 px-2 mt-1">
            Должно быть числом
          </div>
        </div>
        <div class="form__adress-wraper">
          <input
            type="text"
            placeholder="Домофон"
            class="form__delivery-form"
            v-model="formData.domofon"
            @blur="v$.domofon.$touch"
          />
          <div v-if="v$.domofon.$error" class="text-sm text-red-500 px-2 mt-1">
            Должно быть числом
          </div>
        </div>
      </div>
    </div>

    <h3 class="text-3xl mb-7 font-medium">Оплата</h3>
    <div class="flex gap-5 mb-5">
      <div>
        <input
          type="radio"
          name="payment"
          id="card"
          value="card"
          v-model="formData.payment"
          checked
        />
        <label for="card" class="border-solid border rounded-2xl">Картой</label>
      </div>
      <div>
        <input type="radio" name="payment" id="cash" value="cash" v-model="formData.payment" />
        <label for="cash" class="border-solid border rounded-2xl">Наличными</label>
      </div>
    </div>
    <span class="block text-3xl font-medium mb-10">Сумма заказа: {{ price }}&#8381;</span>
    <button
      class="text-xl text-white rounded-full bg-orange-500 px-4 pt-2 pb-2 transition ease-in hover:bg-orange-400"
      type="submit"
    >
      Оформить заказ на {{ price }}&#8381;
    </button>
  </form>
</template>

<style scoped>
.form__contact-form {
  padding: 8px 20px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  transition: 0.5s;
  color: #000000;
}

.form__contact-form::placeholder {
  color: #525557;
}

.form__contact-form:hover {
  border: 1px solid #fdac41a6;
  background-color: #fcbe6eb2;
}
:active,
:hover,
:focus {
  outline: 0;
  outline-offset: 0;
}

.form__contact-form:focus {
  border: 1px solid #f79e2b;
  background-color: white;
}

.form__delivery-form {
  padding: 8px 20px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  transition: 0.5s;
  color: #000000;
  width: 100%;
}

.form__adress-form {
  min-width: 300px;
}

.form__adress-wraper {
  height: 67px;
  width: 100%;
}

.form__delivery-form::placeholder {
  color: #525557;
}

.form__delivery-form:hover {
  border: 1px solid #fdac41a6;
  background-color: #fcbe6eb2;
}

.form__city-form {
  padding: 8px 20px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  transition: 0.5s;
  color: #000000;
  width: 40%;
}

.form__city-form:hover {
  border: 1px solid #fdac41;
}

input[type='radio'] {
  display: none;
}

input[type='radio'] + label {
  user-select: none;
  display: inline-block;
  margin: -2px;
  padding: 7px 20px;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 20px;
  color: white;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: rgb(255, 136, 50);
  transition: 0.4s;
}

input[type='radio']:checked + label {
  background-image: none;
  outline: 0;
  background-color: #000000;
}
</style>
