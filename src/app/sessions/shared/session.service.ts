import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';
  sessions: FirebaseListObservable<Session[]> = null;
  session: FirebaseObjectObservable<Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionList(query = {}): FirebaseListObservable<Session[]> {
    this.sessions = this.db.list(this.basePath, {
      query: query
    });
    return this.sessions;
  }

  getSession(key: string): FirebaseObjectObservable<Session> {
    const path = `${this.basePath}/${key}`;
    this.session = this.db.object(path);
    return this.session;
  }

  createSession(session: Session): void {
    this.sessions.push(session)
      .catch(error => this.handleError(error));
  }

  updateSession(key: string, value: any): void {
    this.sessions.update(key, value)
      .catch(error => this.handleError(error));
  }

  deleteSession(key: string): void {
    this.sessions.remove(key)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
