module.exports = {

    async create(ctx) {
        try {
            ctx.body = await ctx.db.Todolist.create({
                title: ctx.request.body.title,
                complete: ctx.request.body.complete,
                UserId: ctx.request.body.userId
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async findAll(ctx) {

        try {
            ctx.body = await ctx.db.Todolist.findAll({});

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async findAllByUser(ctx) {

        try {
            ctx.body = await ctx.db.Todolist.findAll({
                where: { userId: ctx.params.userId }
            });

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async findOne(ctx) {

        try {
            const todo = await ctx.db.Todolist.findOne({
                where: { id: ctx.params.id }
            });
            if (!todo) {
                ctx.throw(404, 'L\'ID de cette Todo est invalide');
            }
            ctx.body = todo;

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async update(ctx) {

        try {
            const results = await ctx.db.Todolist.update({
                title: ctx.request.body.title,
                complete: ctx.request.body.complete,
                userId: ctx.request.body.userId
            }, {
                    where: { id: ctx.params.id }
                });

            results === 0 ? ctx.throw(500, `L'ID n'a pas été trouvé`) : ctx.body = `La todo avec l'ID n°${ctx.params.id} a été mise à jour`

        }
        catch (err) {
            ctx.throw(500, err);
        }
    },

    async delete(ctx) {

        try {
            const results = await ctx.db.Todolist.destroy({
                where: { id: ctx.params.id }
            });

            results === 0 ? ctx.throw(500, `L'ID n'a pas été trouvé`) : ctx.body = `La todo avec l'ID n°${ctx.params.id} a été supprimé`

        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
}