import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DigimonListComponent } from './pages/digimon-list/digimon-list';
import { DigimonDetailComponent } from './pages/digimon-detail/digimon-detail';
import { DbzListComponent } from './pages/dbz-list/dbz-list';
import { DbzDetailComponent } from './pages/dbz-detail/dbz-detail';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'digimon', component: DigimonListComponent },
  { path: 'digimon/:id', component: DigimonDetailComponent },
  { path: 'dbz', component: DbzListComponent },
  { path: 'dbz/:id', component: DbzDetailComponent },
  { path: '**', redirectTo: '' },
];
