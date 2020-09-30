<template>
  <div class="container" id="conversion">
    <div class="card">
      <div class="card-header bg-primary text-white font-weight-bold">
        {{ title }}
      </div>
      <div class="card-body">
        <div class="form-row text-left">
          <div class="form-group col-md-2">
            <label for="from" class="control-label">Convert From</label>
            <select v-model="from" class="form-control" id="from">
              <option
                v-for="currency in currencies"
                v-bind:value="currency.id"
                v-bind:key="currency.id"
              >
                {{ currency.id }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="to" class="control-label">Convert To</label>
            <select v-model="to" class="form-control" id="to">
              <option
                v-for="currency in currencies"
                v-bind:value="currency.id"
                v-bind:key="currency.id"
              >
                {{ currency.id }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="amount" class="control-label">Amount</label>
            <input
              v-model="amount"
              class="form-control text-right"
              id="amount"
              v-on:keyup="number"
              @keyup.enter="conversion"
            />
          </div>
          <div class="form-group col-md-2 d-flex align-items-end">
            <button class="btn btn-success btn-block" v-on:click="conversion()">
              Calculate
            </button>
          </div>
          <div class="form-group col-md-4">
            <label for="total" class="control-label">Total Amount</label>
            <input v-model="total" class="form-control text-right" disabled />
          </div>
        </div>
        <div v-if="success" class="text-right" style="white-space: pre-line">
          {{ remark }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "@/axios.js";

export default {
  name: "CurrencyConverter",
  data: () => ({
    title: "Currency Conversion",
    currencies: [],
    from: "USD",
    to: "THB",
    amount: null,
    total: null,
    remark: null,
    success: false,
  }),
  mounted() {
    this.getCurrency();
  },
  methods: {
    async getCurrency() {
      await http.get("currency").then((res) => {
        this.currencies = res.data;
      });
    },
    async conversion() {
      await http
        .get(
          "conversion?from=" +
            this.from +
            "&to=" +
            this.to +
            "&amount=" +
            this.amount
        )
        .then((res) => {
          if (res.data.success) {
            this.total = res.data.total
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
            this.remark =
              "1 " +
              this.from +
              " equals to " +
              res.data.rate.toFixed(2) +
              " " +
              this.to +
              "\nLast updated on : " +
              res.data.date;
            this.success = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    number: function () {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
