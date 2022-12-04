# Module Federation with Angular 14 and NX

## Procedure

1. Create an integrated workspace with nx (angular): `npx create-nx-workspace`
1. Create the host app: `npx nx g @nrwl/angular:host dashboard`
1. Create the remote app: `npx nx g @nrwl/angular:remote login --host=dashboard`
