---
title: Inspace Mapping
summary: A web-based interactive mapping platform for commercial real estate — schema-driven, context-aware UI on top of Mapbox and BabylonJS.
tags: [Next.js, TypeScript, Mapbox, BabylonJS]
role: Lead Engineer
year: "2023 – 2024"
coverImage: /assets/images/mapping-platform.webp
heroImage: /assets/images/mapping-hero.webp
liveUrl: https://map.inspacexr.com/inspace/webflow-demo?mode=insights
featured: true
publishedAt: "2024-01-24"
updatedAt: "2024-02-26"
sortOrder: 5
---

In collaboration with my colleague [Ben Zotti](https://github.com/zottiben), who led the initial development, I had the opportunity to contribute significantly to the evolution of an innovative web-based **interactive mapping platform**. Originally designed to enhance the presentation of commercial real estate portfolios, ETFs and REITs, our combined efforts transformed it into a versatile tool for everyone from real estate professionals to landlords and agents. My involvement became particularly instrumental during the platform's rewrite, which introduced a robust **abstraction layer** that elevated the user experience and system flexibility.

This phase of the project was about expanding the platform's capabilities, focusing on the middle-layer UI where I refined the **JSON schema** that underpins the interface. The schema-driven approach streamlined customisation and made the platform far more adaptable, letting users interact with their data in more meaningful ways.

## Schema Design

At the heart of the platform lies a meticulously crafted **JSON schema** — a blueprint that defines the structure and interactivity of the UI. This schema is more than static configuration; it is **contextually aware**, adapting the UI to reflect the information a user needs based on their current interaction mode.

One core concept is the `contextual` property. It acts as a decision-maker that tailors the experience to a specific context. When the URL parameter `?mode=insights` is detected, the schema consults `contextual` to determine which UI elements to display — a dynamic shift in layout without separate pages or manual intervention.

Under `contextual` we have `insights`, a mode-driven feature that rearranges the interface to highlight different data points and visualisation cards. Whether it's a single asset, a comparative multi-asset view, or a granular look at a space, the schema intelligently adjusts the UI.

```json
{
  "contextual": {
    "insights": {
      "asset": {
        "accordions": [
          "building_details",
          "building_overview",
          "building_availability"
        ]
      },
      "multi": {
        "accordions": ["precinct_overview", "precinct_buildings"]
      },
      "space": {
        "accordions": ["listing_overview", "listing_details"]
      }
    }
  }
}
```

Those `accordions` strings point to another structure containing a `name` and `items`. Items map to `cards` — small, composable UI modules that are the smallest renderable unit.

```json
{
  "ui": {
    "accordions": [
      {
        "id": "building_details",
        "title": "Property Details",
        "items": ["building_details_grid"]
      },
      {
        "id": "building_overview",
        "title": "Overview",
        "items": [
          "building_overview_highlights",
          "building_overview_description"
        ]
      }
    ],
    "cards": [
      {
        "id": "building_details_grid",
        "data": { "type": "grid", "items": [] }
      }
    ]
  }
}
```

Each card has a `type` and an `items` array. The `type` maps to a UI component; `items` is a collection of data pointers passed to that component.

## UI Component Abstraction

The **abstraction layer** I introduced was instrumental in improving flexibility. By creating a **context-aware** component that adapts to different data types and interaction modes, we built a more **modular** and **scalable** UI.

Below is a simplified example. The `SwitchRenderer` takes a `value` prop and renders the appropriate component — one component that renders many, based on the data it receives.

```tsx
const ContextualCard = ({ card }) => {
  return (
    <SwitchRenderer value={card.type}>
      <Case value={CardTypes.Grid}>
        <Grid items={card.items} />
      </Case>
      <Case value={CardTypes.List}>
        <List items={card.items} />
      </Case>
    </SwitchRenderer>
  );
};
```

## API & Database Design

The API was built on **Azure Functions** with a **PostgreSQL** database, schema defined via **TypeORM**. Because the platform is so dynamic, the database design had to be built around abstractions — added complexity, but essential for flexibility.

The initial API optimised for quick-to-market. As the platform grew we refactored it to be more **modular** and **scalable**, supporting **micro-requests** and **complex select/filter queries**. That required a careful balance between **performance** and **flexibility**, and the result was a powerful, intuitive backend.

## Skills used

- **Schema design** — a dynamic JSON schema enabling context-aware UI across interaction modes.
- **UI/UX development** — refining middle-layer components and introducing an abstraction layer.
- **API & database design** — a scalable Azure Functions API over a dynamic Postgres schema.
- **Component abstraction** — a base layer for modular, scalable UI construction.
- **Collaborative development** — pushing the boundaries of interactive mapping alongside Ben Zotti.
- **Performance optimisation** — balancing speed and flexibility in the API.
