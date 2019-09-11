import {Injectable} from "@angular/core";
import {Goal} from "./goal";

@Injectable()
export class User {
  public id;
  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;
  public role: string;
  public password: string;
  public goals: Goal [];

  constructor(){}
}
