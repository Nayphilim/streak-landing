# Streak

> The habit app that doesn't nag.

A concept habit-app marketing site — part of the
[Nathan AI Solutions](https://github.com/Nayphilim) portfolio, built with zero UI framework to
show off the web platform itself.

**Stack:** Vite + vanilla TypeScript, pure-CSS illustration (no images).

## About

A playful, neo-brutalist launch page. Everything is hand-built: the tap-to-check-in phone demo
(tick the walk → confetti burst, the streak bumps 12→13, a celebration card pops), the CSS-only
animated mascots, an FAQ accordion, a marquee, and scroll-reveal animations — no framework runtime.

## Develop

```bash
npm install
make dev      # Vite dev server (http://localhost:5173)
make lint     # tsc + prettier
make test     # vitest (check-in state machine)
make build    # static build → dist/
```

## Notes

- Brand, copy, and imagery are fictional concept work for portfolio purposes; not a real product.
- No photography — every illustration is CSS.

## License

Code is released under the [MIT License](LICENSE).
