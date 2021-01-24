# Movie App - React in Angular

Example of Angular components rendering React component:

- [home.component.tsx](src/app/home/home.component.tsx)
- [movie-detail.component.tsx](src/app/movie-detail/movie-detail.component.tsx)

All React components should be wrapped with [`<ReactAdapterProvider />`](src/app/react-adapter.provider.tsx) so we have a common entry point for all components to inject providers.
