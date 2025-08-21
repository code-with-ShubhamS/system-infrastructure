## Styling, theming, and how to change them

### What we use
- **Framework**: Next.js (App Router)
- **CSS system**: Tailwind CSS v4 (via `@import 'tailwindcss'` inside `globals.css`)
- **Design tokens**: Tailwind v4 `@theme` tokens declared in `globals.css` (colors, breakpoints, spacing, animations)
- **Utilities/components**: Custom utilities/components layered in `globals.css` using `@layer utilities` and `@layer components`
- **Dark mode**: `next-themes` toggling a `class="dark"` on `<html>`; Tailwind dark styles via `dark:` variant
- **Fonts**: Google Fonts imported in `globals.css` and a helper utility `.instrument-font`

### How Tailwind is wired up
The project uses Tailwind v4’s CSS-first setup. See the imports and dark variant declaration inside `globals.css`:
```12:20:ux-web/src/app/globals.css
@import 'tailwindcss';

@plugin 'tailwindcss-animate';

@custom-variant dark (&:is(.dark *));
```

Design tokens (colors, spacing, breakpoints, animations) are declared with `@theme`. Tailwind turns these into utility classes (e.g., `bg-purple_blue`, `text-dark_black`).
```12:27:ux-web/src/app/globals.css
@theme {
  --shadow-header_shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);

  --color-dark_black: #1b1d1e;
  --color-purple_blue: #4928fd;
  --color-purple: #ba81ee;
  --color-blue: #70b5ff;
  --color-orange: #ffaf68;
  --color-green: #79d45e;
  --color-pink: #f4889a;
  --color-blue_gradient: #d9f3fc;
  --color-yellow_gradient: #fdf1d3;
  --color-pale-yellow: #f6e683;
  --color-dark_yellow_gradient: #443f32;
  --color-dark_blue_gradient: #303d42;
  ...
}
```

Custom utilities/components are layered for reuse, e.g. container and heading styles:
```90:97:ux-web/src/app/globals.css
@utility container {
  @apply w-full max-w-[82.8rem] my-0 mx-auto py-0 sm:px-7 px-5;
}
```
```141:147:ux-web/src/app/globals.css
h1 {
  @apply 2xl:text-9xl 2xl:leading-[156px] md:text-7xl text-5xl font-medium text-dark_black dark:text-white;
}
```

### Where styles live and how to change them
- **Global tokens and defaults**: `src/app/globals.css`
  - Change brand colors: edit `@theme` `--color-*` values; utilities like `bg-purple_blue`, `text-dark_black` update everywhere.
  - Change container width: update the `@utility container` rule.
  - Change typography defaults: adjust `@layer components` for `h1…h6`, `p`.
  - Change breakpoints/spacing: update `--breakpoint-*` and `--spacing-*` in `@theme`.
- **Per-component styles**: change Tailwind classes directly in each component’s `className`. Example (Hero title):
```42:49:ux-web/src/app/components/home/hero/index.tsx
<h1 className='font-medium w-full'>
  Learn
  <span className='instrument-font italic font-normal dark:text-white/70'> UX/UI Design </span>
</h1>
```
- **Add new utilities/components**: extend `globals.css` under `@layer utilities` or `@layer components` and then use the class names in JSX.

### Is it using global CSS?
Yes. Tailwind v4 is imported and configured inside `globals.css`. All Tailwind tokens/utilities are available globally, and we also define site-wide utilities/components there. Component code then uses Tailwind classes inline (`className`) for layout/appearance.

### How dark mode works (sun icon in header)
Dark mode is handled by `next-themes`. The provider attaches/removes the `dark` class on `<html>`; Tailwind applies any `dark:` variant styles when that class is present.

- Provider setup (class-based theme):
```18:23:ux-web/src/app/layout.tsx
<ThemeProvider
  attribute='class'
  enableSystem={false}
  defaultTheme='dark'
>
```

- Toggler logic (sun/moon) switches theme and uses Tailwind’s `dark:` utilities to swap icons:
```28:37:ux-web/src/app/components/layout/header/ThemeToggle.tsx
<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>...
  <Icon icon="ri:sun-fill" className="hidden dark:block" />
  <Icon icon="ri:moon-fill" className="dark:hidden" />
</button>
```

- Dark variant activation in CSS is enabled by the custom variant:
```10:10:ux-web/src/app/globals.css
@custom-variant dark (&:is(.dark *));
```

When you click the icon:
1) `setTheme('dark'|'light')` updates local storage and toggles the `class="dark"` on `<html>`.
2) Tailwind applies all `dark:*` classes (e.g., `dark:bg-dark_black`, `dark:text-white`).
3) Icon swaps because of `hidden dark:block`/`dark:hidden`.

### Common style changes (recipes)
- **Change the primary brand color**: In `globals.css` under `@theme`, change `--color-purple_blue`. All utilities like `bg-purple_blue`, `text-purple_blue`, borders, etc., update automatically.
- **Add a brand color**: Define `--color-your_color` in `@theme`, then use `bg-your_color`/`text-your_color` classes.
- **Default theme to light**: In `layout.tsx`, set `defaultTheme='light'`. To follow OS theme, set `enableSystem={true}` and `defaultTheme='system'`.
- **Adjust typography scale**: Edit the `@layer components` rules for `h1…h6` and `p`.
- **Change container width/gutters**: Edit the `@utility container` rule.
- **Component-specific tweaks**: Edit the Tailwind classes in the component’s `className`. For dark-mode specific styling, use `dark:` prefixed utilities alongside the normal ones.

### Quick checklist
- Global tokens: `globals.css` `@theme`
- Custom utilities/components: `globals.css` `@layer utilities/components`
- Dark mode: `ThemeProvider` + `ThemeToggle` + `@custom-variant dark` + `dark:` utilities
- Per-component styles: edit `className` strings in the component files


