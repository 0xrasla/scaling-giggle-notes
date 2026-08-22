# Shared DOM Contract (single index.html)

All sub-agents MUST build against this contract so outputs integrate cleanly.

## Structure (in order)
1. `<header class="site-header">` — fixed/sticky nav with `.nav-toggle` button and `.nav-menu`
2. `<section id="hero">` — `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-cta` (anchor to #menu)
3. `<section id="menu">` — `.menu-filters` with `.filter-btn[data-filter]` buttons, `.menu-grid` with `.product-card` items
4. `<section id="featured">` — `.featured-grid` with `.featured-card`
5. `<section id="about">` — `.about-content`, `.about-text`, `.about-image`
6. `<section id="contact">` — `.contact-info`, `.hours`, `.contact-form` (form#order-form)
7. `<footer class="site-footer">`

## Product cards (JS hook points)
```html
<div class="product-card" data-category="espresso|milk|pour-over|cold|food">
  <img class="product-image" src="..." alt="...">
  <h3 class="product-name">Name</h3>
  <p class="product-price">$5.00</p>
  <button class="add-to-cart" data-name="Name" data-price="5.00">Add to cart</button>
</div>
```

## Cart (JS hook points)
```html
<div class="cart-drawer">
  <button class="cart-toggle" aria-label="Open cart">Cart <span class="cart-count">0</span></button>
  <div class="cart-items"><!-- JS injects rows --></div>
  <p class="cart-total">Total: <span class="cart-total-value">$0.00</span></p>
  <button class="checkout-btn">Checkout</button>
</div>
```

## JS-only IDs
`#order-form`, `#cart-toggle`, `#cart-drawer`, `#cart-items`, `#cart-count`, `#cart-total-value`, `#menu-grid`, `#featured-grid`, `.add-to-cart`, `.filter-btn`

## JS responsibilities (in one `<script>` at end of body)
- Menu filtering via `.filter-btn[data-filter]` + `.product-card[data-category]`
- Cart: add/remove/increment, update `.cart-count` & `.cart-total-value`, store in memory
- Cart drawer open/close (`.cart-toggle`, `.cart-drawer`)
- Mobile nav toggle (`.nav-toggle`, `.nav-menu`)
- Form submit handler on `#order-form` → show success message
- Cart badge animation on add
- Smooth-scroll for anchor links
- Reveal-on-scroll animation (IntersectionObserver adds `.visible` to `.reveal` elements)