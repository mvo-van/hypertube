run:
	@docker compose --env-file .env up -d --build

stop:
	@docker compose down

# Used when installing new dependencies
build:
	@docker compose build
