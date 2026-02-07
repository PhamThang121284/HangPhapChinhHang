# HangPhapChinhHang

backend folder tree
backend/
src/
app.js # express app: middlewares + routes mounted
server.js # start server, connect db, handle shutdown

        config/
            env.js                   # env parsing/validation (zod/joi)
            index.js                 # config export (port, db url, jwt, etc.)

        database/
            mongo.js                 # mongoose connection + events
            plugins/                 # mongoose plugins (toJSON, pagination...)
            indexes.js               # optional: ensureIndexes at boot

        modules/
            auth/
                auth.routes.js
                auth.controller.js
                auth.service.js
                auth.schema.js         # request validation schemas
                auth.middleware.js     # auth guards, role checks
                auth.tokens.js         # jwt helpers, refresh tokens
            users/
                user.model.js
                user.routes.js
                user.controller.js
                user.service.js
                user.repository.js
                user.schema.js
            products/
                product.model.js
                product.routes.js
                product.controller.js
                product.service.js
                product.repository.js
                product.schema.js
            orders/
                order.model.js
                order.routes.js
                order.controller.js
                order.service.js
                order.repository.js
                order.schema.js

        middlewares/
        errorHandler.js          # centralized error middleware
        validateRequest.js       # validate req.body/params/query
        rateLimiter.js
        notFound.js
        requireAuth.js           # verify jwt (or delegate to modules/auth)
        requireRole.js

        utils/
        asyncHandler.js          # wraps controllers to catch errors
        ApiError.js              # custom error class
        logger.js                # pino/winston
        pagination.js
        crypto.js                # hash helpers, token hashing
        sanitize.js

        integrations/
        stripe/
            stripe.client.js
            stripe.webhooks.js
        mail/
            mailer.js              # nodemailer / provider SDK
        shipping/
            shipping.client.js

        jobs/
        queues.js                # bullmq / agenda init
        workers/
            sendEmail.worker.js
            syncStock.worker.js

        routes/
        index.js                 # combines all module routes, API versioning
        health.routes.js         # /health

        docs/
        openapi.yml              # optional

        constants/
        roles.js
        orderStatus.js

        types/                     # only if TS; omit in JS projects
        test/                      # if you prefer co-located tests, otherwise /tests

    tests/
    unit/
    integration/

    scripts/
    seed.js # database seed
    create-indexes.js # optional

    .env.example
    package.json
    Dockerfile
    docker-compose.yml
    README.md
