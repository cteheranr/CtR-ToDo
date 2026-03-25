import { Component, inject, OnInit, signal } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Snackbar } from './shared/components/snackbar/snackbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Snackbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'CtR-ToDo';
}
