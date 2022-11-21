develop:
	npx webpack serve

install:
	npm ci
	
build:
	rm -rf dist
	npx webpack

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix
