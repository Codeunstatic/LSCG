# Citizens Gate — Complaint Routing UI Update

## Purpose

Update the existing Report an Issue / Complaint submission flow in the current Citizens Gate build.

This is a UI + light UX prototype only.

Do not build or implement the backend routing logic. The interface should simply demonstrate how automatic routing is expected to work once the backend exists.

## 1. Core UX Principle

Citizens should not be required to know which Ministry, Department or Agency (MD) is responsible for their issue.

The citizen should:

1. Select the relevant issue category.
2. Describe what happened and where.
3. The system/backend determines the appropriate MD and, where applicable, the relevant sub-MD/sub-department.
4. The UI displays the routing result.
5. The citizen can manually change the suggested routing if they believe it is incorrect.

The prototype should simulate this behaviour.

## 2. Important: This Is NOT an AI Feature

The routing should not be presented as AI-powered.

Do not add:

- AI labels
- AI confidence scores
- "AI identified this" messaging
- AI explanations
- AI chat behaviour
- AI-specific UI

The actual routing is assumed to be handled by backend/system logic, potentially using the selected category and information in the submitted description.

For this assignment, we are only designing the front-end experience and interaction states.

## 3. Routing Component — Initial State

Add a routing component to the existing complaint/report form.

**Label**

> Responsible department

**Supporting text**

> Your report will be routed to the appropriate government department.

The citizen should not have to select an MD at this stage.

Do not make them understand Lagos State Government's internal organisational structure before they can submit a complaint.

## 4. User Selects a Category

The existing category selection should remain part of the flow.

For example:

> **Category**
> Roads & Drainage

The category gives the system useful context for determining where the report should be routed.

Do not remove the category selection just because routing is automated.

## 5. User Describes the Issue

The user then describes what happened.

Example:

> The drainage on my street has been blocked for several days and water is collecting whenever it rains.

The description field remains the primary user input.

The citizen should describe the problem naturally rather than trying to determine which government department is responsible.

## 6. Routing / Loading State

After the user enters enough information into the description field, simulate the routing process.

Only the routing component should enter a loading state.

**Do NOT**

- Reload the entire page.
- Make the entire form appear disabled.
- Show a full-page loading screen.
- Animate unrelated parts of the form.

The description and other form fields should remain visually stable.

**Loading copy**

> Determining where to route your report…

Use a subtle loading indicator, skeleton, or shimmer.

The loading state should be brief in the prototype.

## 7. Automatically Routed State

After the simulated loading state, show the department that the system has determined should receive the report.

Example:

> **Responsible department**
> Ministry of Environment & Water Resources
> Drainage Services

Supporting copy:

> Your report will be routed here.

Then provide a secondary action:

> Change department →

The exact wording can be adjusted slightly to fit the existing UI.

## 8. The User Must Still Be Able to Change It

The automatically selected department must not be locked.

The system is routing the complaint automatically, but the citizen should still have control.

When the user clicks **Change department**, open a dropdown/select interface allowing them to choose another:

- Ministry
- Department/Agency
- Sub-department/unit, where applicable

The automatically determined destination should therefore behave like a pre-populated recommendation, not a permanently disabled field.

## 9. Example Interaction

**Step 1 — Select category**

> Roads & Drainage

**Step 2 — Describe the issue**

> The drainage on my street has been blocked for several days and water is collecting whenever it rains.

**Step 3 — System routes the report**

The routing component briefly displays:

> Determining where to route your report…

**Step 4 — Routing result**

The component changes to:

> **Responsible department**
> Ministry of Environment & Water Resources
> Drainage Services
>
> Your report will be routed here.
>
> Change department →

**Step 5 — Manual change**

The user clicks **Change department**.

A dropdown opens and allows them to select another department/sub-department.

## 10. What Happens When the System Cannot Determine the Department?

For this prototype, do not build a special AI confidence/error system.

If we want to demonstrate an unresolved routing state, simply show a neutral fallback:

> **Responsible department**
> We couldn't determine the appropriate department automatically.
>
> Select department →

This is optional for the prototype. The important requirement is that the normal automatic-routing flow is clearly demonstrated.

## 11. What NOT to Change

This update should be integrated into the existing complaint/report flow.

Do not:

- Redesign the entire complaint page.
- Create a separate page specifically for routing.
- Implement backend routing logic.
- Build an AI system.
- Add an AI assistant.
- Ask the citizen to identify the responsible MD before submitting.
- Require the citizen to visit the MD directory to understand where their complaint belongs.
- Make the automatically selected department permanently disabled.

The existing MD directory/information page can continue to exist elsewhere on Citizens Gate, but it should not be required for submitting a report.

## 12. Visual Direction

The routing component should feel like a natural part of the existing complaint form.

Use the existing Citizens Gate design system:

- Existing typography
- Existing spacing
- Existing navy/blue/green palette
- Existing border radius
- Existing form controls
- Existing input/card styling

The routing result should be noticeable enough to reassure the citizen that their complaint has been correctly directed, but it should not overpower the actual complaint description.

**Recommended hierarchy**

1. **Description** — primary user input.
2. **Responsible department** — system-generated routing result.
3. **Change department** — secondary user control.

## 13. Required Prototype States

The prototype should demonstrate these four states:

**State 1 — Initial**

The routing component says:

> Responsible department
> Your report will be routed to the appropriate government department.

No MD has been selected manually.

**State 2 — Processing**

After the description is entered:

> Determining where to route your report…

Only the routing component shows a loading state.

**State 3 — Automatically Routed**

Show:

> Responsible department
> Ministry of Environment & Water Resources
> Drainage Services
>
> Your report will be routed here.
>
> Change department →

**State 4 — Manual Override**

Clicking **Change department** opens the selector.

The user can select a different department and, where applicable, a different sub-department/unit.

## 14. Prototype Implementation

Because this is a UI assignment, the routing can use hard-coded/mock data.

For example:

> Roads & Drainage + drainage-related description
>
> →
>
> Ministry of Environment & Water Resources
> Drainage Services

The prototype does not need to actually analyse the text or determine the department.

The goal is simply to demonstrate the intended interaction.

## 15. Acceptance Criteria

The update is complete when:

- [ ] The user is not asked to select an MD before describing their issue.
- [ ] The existing category selection remains part of the flow.
- [ ] The description remains the primary way the citizen explains the problem.
- [ ] A Responsible Department routing component exists within the complaint form.
- [ ] Entering a description triggers a simulated routing/loading state.
- [ ] Only the routing component loads; the entire page does not reload.
- [ ] A responsible MD is displayed after the loading state.
- [ ] A sub-MD/sub-department can be displayed where applicable.
- [ ] The automatically displayed destination can be manually changed.
- [ ] The user can open a dropdown/select interface to change the routing.
- [ ] The UI clearly communicates that the report will be routed to the appropriate government team.
- [ ] No AI-specific language or functionality is introduced.
- [ ] No backend routing logic is required.
- [ ] The feature fits naturally into the existing Citizens Gate complaint flow.

## Final UX Intent

The experience should communicate a very simple idea:

> You explain the problem. Citizens Gate routes it to the right government team.

The citizen should not need to understand how Lagos State Government is organised in order to make a useful report.
