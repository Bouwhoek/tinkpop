# Tinkpop

Make your own 3D-printable keychains, signs and more, right in your browser. Open source.

Type it. Tink it. Print it.

https://tinkpop.com (coming soon)


## License

Code: GNU AGPL-3.0 (see `LICENSE`). Images and docs: CC BY 4.0. Files you make with Tinkpop are yours to use freely.

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321
npm run check    # licenses, legal block per module, types, tests, build
```

Code lives in `src/modules/<main>/<part>/`, one folder per module with a `module.json` card (see `docs/2-plan/modules.md`).
