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
      image: 'https://i.redd.it/lti6z5yqm8h31.png',
      route: '/digimon',
      themeClass: 'universe-digimon',
    },
    {
      id: 'dbz',
      title: 'Dragon Ball Z',
      description:
        'Guerreros saiyajin, artes marciales y batallas cósmicas. Consulta sus niveles de poder y transformaciones.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/0/0b/Dragon_Ball_Z_logo.svg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original',
      route: '/dbz',
      themeClass: 'universe-dbz',
    },
    {
      id: 'pokemon',
      title: 'Pokémon',
      description:
        'Criaturas de bolsillo con habilidades elementales. Explora estadísticas, tipos y movimientos.',
      image:
        'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/330px-International_Pok%C3%A9mon_logo.svg.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
      route: '/pokemon',
      themeClass: 'universe-pokemon',
    },
    {
      id: 'demon-slayer',
      title: 'Demon Slayer',
      description:
        'Cazadores de demonios dominando respiraciones elementales y las lunas demoníacas del clan Muzan.',
      image:
        'https://images.seeklogo.com/logo-png/40/1/kimetsu-no-yaiba-logo-png_seeklogo-408229.png',
      route: '/demon-slayer',
      themeClass: 'universe-demon-slayer',
    },
  ];
}
