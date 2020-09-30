const Router = require('koa-router');
const router = new Router();

router.get('/api/currency', async ctx => {
    let currency = await ctx.get('https://api.exchangeratesapi.io/latest');
    var jsonObj = [];

    for (key in currency.rates) {
        item = {};
        item['id'] = key
        jsonObj.push(item);
    }

    ctx.body = jsonObj;
})

router.get('/api/conversion', async (ctx) => {
    const { from, to, amount } = ctx.request.query;

    if (from !== undefined && to !== undefined && amount !== undefined) {
        try {
            let exchange = await ctx.get('https://api.exchangeratesapi.io/latest?base=' + from + '&symbols=' + from + ',' + to);
            let rate = exchange.rates[to];
            let total = rate * amount;
            let date = exchange.date;
            ctx.body = {
                success: true,
                rate,
                total,
                date,
            };
        } catch (err) {
            err.status = err.statusCode || err.status || 500;
            ctx.body = err.message;
        }
    }
    else {
        ctx.status = 400;
        ctx.body = 'Required parameters missing';
    }
});

module.exports = router;