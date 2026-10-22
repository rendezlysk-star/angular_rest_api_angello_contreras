import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { DigimonListComponent } from './pages/digimon-list/digimon-list';
import { DigimonDetailComponent } from './pages/digimon-detail/digimon-detail';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'digimon', component: DigimonListComponent },
  { path: 'digimon/:id', component: DigimonDetailComponent },
  { path: '**', redirectTo: '' },
];
