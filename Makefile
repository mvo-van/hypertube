run:
	@docker compose --env-file .env up -d --build

stop:
	@docker compose down

lint:
	@cd api && npm run lint
	@cd app && npm run lint

lint-fix:
	@cd api && npm run lint:fix
	@cd app && npm run lint:fix

# Used when installing new dependencies
build:
	@docker compose build
