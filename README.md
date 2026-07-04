# @offload-project/hallogen

A React component library built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
and [Tailwind CSS v4](https://tailwindcss.com/), with charts, an Inertia.js integration layer, hooks, and utilities.
Every component, hook, and util is individually importable via a subpath export for optimal tree-shaking.

## Installation

This package is published to the **GitHub Packages** registry. Add the scope to your `.npmrc` first:

```ini
# .npmrc
@offload-project:registry=https://npm.pkg.github.com
```

Then install:

```sh
bun add @offload-project/hallogen
```

### Peer dependencies

The library expects your app to own these versions. Install the required ones:

```sh
bun add react react-dom @inertiajs/react lucide-react tailwindcss
```

| Package                | Version | Required? | Needed for                                                                        |
|------------------------|---------|-----------|-----------------------------------------------------------------------------------|
| `react`                | `^19`   | required  | everything                                                                        |
| `react-dom`            | `^19`   | required  | everything                                                                        |
| `@inertiajs/react`     | `^3`    | required  | navbar, sidebar, pagination, `link`, composite render components, filter/URL hooks |
| `lucide-react`         | `^1`    | required  | component icons                                                                   |
| `tailwindcss`          | `^4`    | required  | styling                                                                           |
| `recharts`             | `^3`    | optional  | `area-chart`, `bar-chart`, `line-chart`, `pie-chart`, `chart`                     |
| `sonner`               | `^2`    | optional  | `toast`                                                                           |
| `shiki`                | `^4`    | optional  | `code-block`                                                                      |
| `embla-carousel-react` | `^8`    | optional  | `carousel`                                                                        |
| `@react-stately/color` | `^3`    | optional  | `color-picker`                                                                    |

The **optional** peers are only pulled in if you use their feature — install them as needed
so you don't ship code you don't use:

```sh
bun add recharts               # charts
bun add sonner                 # toast
bun add shiki                  # code-block
bun add embla-carousel-react   # carousel
bun add @react-stately/color   # color-picker
```

## Styles

Import the prebuilt, fully-compiled stylesheet once at your app's entry point:

```ts
import "@offload-project/hallogen/styles.css";
```

### Theming (unprocessed sources)

If you run your own Tailwind build and want to theme the library, import the raw
(unprocessed) CSS sources instead and layer your overrides on top:

```css
/* your app.css */
@import "tailwindcss";
@import "@offload-project/hallogen/styles/index.css";
```

The raw sources are provided so you can customize design tokens:

| Import                                                | Contents                                                  |
|-------------------------------------------------------|-----------------------------------------------------------|
| `@offload-project/hallogen/styles/index.css`          | Base layer: Tailwind setup, theme tokens, `dark` variant  |
| `@offload-project/hallogen/styles/themes/default.css` | Default light/dark color tokens — copy & edit to re-theme |
| `@offload-project/hallogen/styles/shiki.css`          | Syntax-highlighting theme for `code-block`                |

Dark mode is class-based: add `class="dark"` to your `<html>` element (see the
`use-appearance` hook for a ready-made toggle).

## Usage

Import components from their subpath (recommended — best tree-shaking):

```tsx
import {Button} from "@offload-project/hallogen/button";
import {Avatar} from "@offload-project/hallogen/avatar";

export function Example() {
    return (
        <div className="flex items-center gap-3">
            <Avatar src="/me.png" alt="Me"/>
            <Button variant="primary" onPress={() => console.log("clicked")}>
                Save
            </Button>
        </div>
    );
}
```

Or from the barrel entry (convenient, still tree-shakeable via the bundler):

```tsx
import {Button, Avatar} from "@offload-project/hallogen";
```

### Import path conventions

| Kind                 | Subpath                                   | Example                    |
|----------------------|-------------------------------------------|----------------------------|
| UI component         | `@offload-project/hallogen/<name>`        | `.../button`               |
| Composite component  | `@offload-project/hallogen/<name>`        | `.../resource-table`       |
| Shared style presets | `@offload-project/hallogen/shared/<name>` | `.../shared/button-styles` |
| Hook                 | `@offload-project/hallogen/hooks/<name>`  | `.../hooks/use-clipboard`  |
| Utility              | `@offload-project/hallogen/lib/<name>`    | `.../lib/cn`               |
| Shared types         | `@offload-project/hallogen/types`         | `PaginatedData<T>`, …      |

## Components

### UI

`area-chart` · `avatar` · `badge` · `bar-chart` · `bar-list` · `breadcrumbs` · `button` · `button-group` · `calendar` ·
`card` · `carousel` · `chart` · `checkbox` · `choice-box` · `code-block` · `color-area` · `color-field` ·
`color-picker` · `color-slider` · `color-swatch` · `color-swatch-picker` · `color-thumb` · `color-wheel` · `combo-box` ·
`command-menu` · `container` · `context-menu` · `count-up` · `date-field` · `date-picker` · `date-range-picker` ·
`description-list` · `detail-line` · `details` · `dialog` · `disclosure-group` · `divider-pattern` · `drop-zone` ·
`dropdown` · `empty` · `fade-in` · `field` · `file-trigger` · `grid-lines` · `grid-list` · `heading` · `input` ·
`input-otp` · `keyboard` · `leaderboard` · `line-chart` · `link` · `list-box` · `loader` · `marquee` · `menu` ·
`meter` · `meter-group` · `modal` · `multiple-select` · `native-select` · `navbar` · `noise` · `note` · `number-field` ·
`pagination` · `password-field` · `pie-chart` · `popover` · `progress-bar` · `progress-circle` · `qr-code` · `radio` ·
`range-calendar` · `scroll-area` · `search-field` · `select` · `separator` · `sheet` · `shimmering-text` · `show-more` ·
`sidebar` · `skeleton` · `slider` · `snippet` · `switch` · `table` · `tabs` · `tag-field` · `tag-group` · `text` ·
`text-field` · `textarea` · `time-field` · `toast` · `toggle` · `toggle-group` · `toolbar` · `tooltip` · `tracker` ·
`tree`

### Composite

Higher-level, Inertia-aware building blocks:

`form-section` · `header-package` · `resource-clear-filters` · `resource-filters` · `resource-table` ·
`breadcrumb-items-render` · `menu-items-render` · `navbar-items-render` · `pagination-render` ·
`sidebar-items-render` · `svg-html-render`

### Shared style presets

[`tailwind-variants`](https://www.tailwind-variants.org/) style definitions shared across components,
importable for building your own variants. Available from the barrel or the `shared/<name>` subpath:

| Module                 | Exports                                                               |
|------------------------|-----------------------------------------------------------------------|
| `shared/badge-styles`  | `badgeStyles`                                                         |
| `shared/button-styles` | `buttonStyles`                                                        |
| `shared/field-styles`  | `labelStyles`, `descriptionStyles`, `fieldErrorStyles`, `fieldStyles` |
| `shared/toggle-styles` | `toggleStyles`                                                        |

```tsx
import {buttonStyles} from "@offload-project/hallogen/shared/button-styles";
// or from the barrel: import { buttonStyles } from "@offload-project/hallogen";

// reuse the button's variants on a custom element
<a className={buttonStyles({variant: "primary", size: "sm"})}>Link button</a>;
```

## Hooks

Import from `@offload-project/hallogen/hooks/<name>`:

| Hook                            | Purpose                                                           |
|---------------------------------|-------------------------------------------------------------------|
| `use-appearance`                | Light/dark/system appearance state & `<html class="dark">` toggle |
| `use-chart`                     | Chart config/context helper                                       |
| `use-choicebox`                 | State for the `choice-box` component                              |
| `use-clipboard`                 | Copy-to-clipboard with a reset timeout                            |
| `use-column-visibility-context` | Table column visibility context                                   |
| `use-command-menu`              | Open/close state for `command-menu`                               |
| `use-confirm-action`            | Confirmation-dialog flow for destructive actions                  |
| `use-current-url`               | Current Inertia URL helpers                                       |
| `use-index-filters`             | Inertia filter/sort wiring for index pages (`applyFilters`, `sortDescriptor`, `onSortChange`, `onSearchSubmit`) |
| `use-initials`                  | Derive initials from a name (for `avatar`)                        |
| `use-media-query`               | Subscribe to a CSS media query                                    |
| `use-mobile`                    | Boolean for the mobile breakpoint                                 |
| `use-navbar`                    | Navbar open/collapsed state                                       |
| `use-sidebar`                   | Sidebar open/collapsed state                                      |
| `use-table-context`             | Access `resource-table` context                                   |

## Utilities

Import from `@offload-project/hallogen/lib/<name>`:

| Module            | Exports                                                                                                                       |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `lib/cn`          | `cn()` — merge class names (clsx + tailwind-merge)                                                                            |
| `lib/primitive`   | `cx()` — class-name composer for variant primitives                                                                           |
| `lib/number`      | `formatNumber`, `formatCurrency`, `formatKilo`, `formatFileSize`                                                              |
| `lib/date`        | `formatDate`, `formatDatetime`, `formatHumans`, `formatAge`, `calculateDuration`, `parseTimeStringToTimeObject`, `dayOfWeeks` |
| `lib/filter`      | `parseSortDescriptor`, `handleSearch`, `handleSortChange`, `hasActiveFilters`                                                 |
| `lib/fire-toasts` | `fireToasts(toasts)` — fire an array of `ToastMessage`s via `sonner` (needs the `sonner` peer)                                |

## Development

This project uses [Bun](https://bun.sh/). Install dependencies with `bun install`, then:

| Script            | Command                   | Purpose                                                            |
|-------------------|---------------------------|--------------------------------------------------------------------|
| `build`           | `bun run build`           | Type-check (`tsc`) and build the library (`vite build`) to `dist/` |
| `storybook`       | `bun run storybook`       | Run Storybook locally                                              |
| `build-storybook` | `bun run build-storybook` | Build the static Storybook                                         |
| `test`            | `bun run test`            | Run the component tests once (Vitest, browser mode)                |
| `test:watch`      | `bun run test:watch`      | Run the tests in watch mode                                        |
| `lint`            | `bun run lint`            | Lint & autofix with Biome                                          |
| `lint:check`      | `bun run lint:check`      | Lint without writing                                               |
| `format`          | `bun run format`          | Format with Biome                                                  |
| `apply`           | `bun run apply`           | Biome check + write (lint + format)                                |

The package is **ESM-only**. The build emits, per subpath export, an ES module (`.js`) and
type declarations (`.d.ts`). The compiled stylesheet is written to `dist/styles.css`, and the
raw stylesheets are copied unprocessed to `dist/styles/` for theming. CommonJS consumers can
load it via dynamic `import()`.

### Stories & tests

Every component has a Storybook story in `src/stories/`. Tests run via
[`@storybook/addon-vitest`](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon),
which turns each story into a test (render smoke test + any `play` interaction). Tests execute in
a real browser (Playwright Chromium), so the browser is downloaded on first run
(`bunx playwright install chromium` if needed). Run them with `bun run test`.

## License

Private — © Offload Project.
