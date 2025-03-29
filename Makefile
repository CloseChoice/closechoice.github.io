dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up

prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up

prod_detached:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up

down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v --remove-orphans

cleanup:
	docker rm- f tobias-pitters-frontend-prod-image