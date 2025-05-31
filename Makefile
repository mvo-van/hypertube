run:
	@docker compose --env-file .env up -d

stop:
	@docker compose down

# Used when installing new dependencies
build:
	@docker compose build