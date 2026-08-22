Build a beautiful, responsive coffee shop website as a single `index.html` file using HTML, CSS, and JavaScript.

The main session must use multiple sub-agents in parallel to build the project efficiently. Keep the main conversation clean by delegating independent tasks to sub-agents and combining their results.

Create a `plan.md` file before implementation. The plan must clearly define the sub-agent workflow, including:

- Which sub-agents will be used
- What responsibility each sub-agent has
- Which tasks can run in parallel
- How the main session will coordinate and integrate their results
- The final integration and testing step

Suggested sub-agent structure:

1. UI/UX Agent — design the coffee shop's visual style, layout, colors, typography, and overall experience.
2. Frontend Agent — implement the HTML/CSS structure and responsive layout.
3. JavaScript Agent — implement interactions such as menu filtering, cart functionality, buttons, and other small UI interactions.
4. Review Agent — inspect the implementation for visual, functional, accessibility, and responsive issues.

The main session should orchestrate these agents, resolve conflicts between their outputs, integrate everything, and produce the final single-file `index.html`.

The website should feel polished and modern, with:

- Hero section
- Coffee shop menu
- Product cards
- About section
- Featured/special coffee section
- Simple cart/order interaction
- Contact/location section
- Responsive mobile layout
- Smooth animations and subtle interactions

Do not create a complicated backend or separate frontend project. Everything should ultimately work from a single `index.html` file.

The primary purpose of this task is to demonstrate how a main agent can delegate work to multiple sub-agents in parallel while keeping the main session focused on orchestration and final integration.
