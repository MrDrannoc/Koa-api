module.exports = {

    async create(ctx) {

        try {
            ctx.body = await ctx.db.Company.create({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                adresse: ctx.request.body.adresse
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async find(ctx) {

        try {
            ctx.body = await ctx.db.Company.findAll({
                include: [
                    {
                        model: ctx.db.Job
                    }
                ]
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOne(ctx) {

        try {
            console.log(ctx.params.id)
            const company = await ctx.db.Company.findOne({
                where: { id: ctx.params.id }
            });
            if (!company) {
                ctx.throw(404, 'company id is invalid');
            }
            ctx.body = company;

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async destroy(ctx) {

        try {
            const results = await ctx.db.Company.destroy({
                where: { id: ctx.params.id }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `company is deleted with id ${ctx.params.id}`

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async update(ctx) {

        try {
            const results = await ctx.db.Company.update({
                name: ctx.request.body.name,
                city: ctx.request.body.city,
                adresse: ctx.request.body.adresse,
            }, {
                where: { id: ctx.params.id }
            });

            results === 0 ? ctx.throw(500, 'invalid id provided') : ctx.body = `company is updated with id ${ctx.params.id}`

        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
}