# Commands

- Doctor
  Optional flag: --fix

Checks that everything is set up correctly:

- components.json
- nativewind
- rnr deps (tailwindcss-animate class-variance-authority clsx tailwind-merge)
- typescript alias
- cn
- css variables
- constants
- tailwind config
- Check for theme and Portal in /\_layout.tsx
- Git has no uncommitted changes

If not set up correctly, it will either prompt the user to fix it (with link to docs) or fix it automatically.

- Add

Runs the doctor command then uses the shadcn-cli to add component(s)

- Update

Runs the doctor command then finds all rnr components and updates them to the latest version.

- Init

If in existing project, runs the doctor --fix command.

If not in existing project, creates a new project

## Things to check

- Given how i made the registries, does every thing work like shadcn's?
  - different type alias
  - don't use css variables

### Revisit shadows

On docs, they look good but on expo-web they look bad. They looked bad on native too so i added shadow-black/5 on native only. Maybe I should add it to web too.
