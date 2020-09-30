import Vue from 'vue'
import Router from 'vue-router'
import conversion from '@/components/Conversion'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Conversion',
            component: conversion,
            meta: {
                title: 'Currency Conversion'
            }
        }
    ]
})