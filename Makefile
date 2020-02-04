install:
	npm ci

run:
	npx babel-node 'src/bin/ncalc.js'

test:
	npm test

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

publish:
	npm publish

.PHONY: test
