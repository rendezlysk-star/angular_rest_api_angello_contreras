import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface UniverseCard {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
  themeClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  universes: UniverseCard[] = [
    {
      id: 'digimon',
      title: 'Digimon',
      description:
        'Monstruos digitales nacidos en la red. Explora sus líneas evolutivas y atributos de combate.',
      image: 'https://images.alphacoders.com/264/264906.jpg',
      route: '/digimon',
      themeClass: 'universe-digimon',
    },
    {
      id: 'dbz',
      title: 'Dragon Ball Z',
      description:
        'Guerreros saiyajin, artes marciales y batallas cósmicas. Consulta sus niveles de poder y transformaciones.',
      image: 'https://images.alphacoders.com/133/1330953.png',
      route: '/dbz',
      themeClass: 'universe-dbz',
    },
    {
      id: 'pokemon',
      title: 'Pokémon',
      description:
        'Criaturas de bolsillo con habilidades elementales. Explora estadísticas, tipos y movimientos.',
      image: 'https://images.alphacoders.com/134/1344697.png',
      route: '/pokemon',
      themeClass: 'universe-pokemon',
    },
    {
      id: 'demon-slayer',
      title: 'Demon Slayer',
      description:
        'Cazadores de demonios dominando respiraciones elementales y las lunas demoníacas del clan Muzan.',
      image: 'https://images.alphacoders.com/102/1026639.jpg',
      route: '/demon-slayer',
      themeClass: 'universe-demon-slayer',
    },
  ];
}
