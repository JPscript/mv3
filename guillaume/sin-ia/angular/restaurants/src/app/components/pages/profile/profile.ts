import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
    fakeUser = {
      'id': 1,
      'nombre': 'John Doe',
      "image_url": "",
      "created_at": "2026-03-19T16:15:45.176Z",
      "updated_at": "2026-03-19T16:15:45.176Z"
    }
}
