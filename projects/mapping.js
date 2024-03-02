// Assuming your code snippet is a JSON object or any other code
const contextual_sample = {
  contextual: {
    insights: {
      asset: {
        accordions: [
          "building_details",
          "building_overview",
          "building_availability",
        ],
      },
      multi: {
        accordions: ["precinct_overview", "precinct_buildings"],
      },
      space: {
        accordions: ["listing_overview", "listing_details"],
      },
    },
  },
};

const card_sample = {
  id: "building_details_grid",
  data: {
    type: "grid",
    items: [
      /** ... */
    ],
  },
};

const ui_sample = {
  ui: {
    accordions: [
      {
        id: "building_details",
        title: "Property Details",
        items: ["building_details_grid"],
      },
      {
        id: "building_overview",
        title: "Overview",
        items: [
          "building_overview_highlights",
          "building_overview_description",
        ],
      },
      /** ... */
    ],
    cards: [
      /**... */
    ],
  },
};
// Convert the object to a formatted JSON string
const formattedContextualCode = JSON.stringify(contextual_sample, null, 2);
const formattedCardCode = JSON.stringify(card_sample, null, 2);
const formattedUICode = JSON.stringify(ui_sample, null, 2);

// Get the placeholder element by its ID
const codeContextualElement = document.getElementById("code-contextual-sample");
const codeCardElement = document.getElementById("code-card-sample");
const codeUIElement = document.getElementById("code-ui-sample");
const codeComponentSample = document.getElementById("code-component-sample");

codeContextualElement.innerHTML = `${formattedContextualCode}`;
codeCardElement.innerHTML = `${formattedCardCode}`;
codeUIElement.innerHTML = `${formattedUICode}`;
codeComponentSample.innerHTML = `const ContextualCard = ({ card }) => {
  return (
    &lt;SwitchRenderer value={card.type}&gt;
      &lt;Case value={CardTypes.Grid}&gt;
        &lt;Grid items={card.items} /&gt;
      &lt;/Case&gt;
      &lt;Case value={CardTypes.List}&gt;
        &lt;List items={card.items} /&gt;
      &lt;/Case&gt;
      {/* ... */}
    &lt;/SwitchRenderer&gt;
  );
}`;
