import {Injectable, OnInit} from '@angular/core';
import {User} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import * as jwt_decode from "jwt-decode";
import {CookieService} from "ngx-cookie-service";
import {Goal} from "./goal";

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{
  public user: User;
  public goal: Goal;
  public errorMessage;
  public successMessage;
  public redirect;
  public link;
  public confirmPassword: string;
  public isLoggedIn: boolean = false;
  public allUsers: User[] = [];
  public statusList;
  private http: HttpClient;
  private cookie: CookieService;

  private httpOtions = {
    headers : new HttpHeaders({
      'Content-Type': 'Application/json',
      'Authorization': 'Token '+ this._cookie.get('user_token')
    })
  }

  userTypes = ['owner', 'user'];

  constructor(private _http: HttpClient, private _user: User, private router: Router, private _cookie: CookieService) {
    this.user = _user;
    this.http = _http;
    this.cookie = this._cookie;
    this.getToken();

    // this.checkLoggedInState();
  }

  ngOnInit(){
  }

  create(){
    const url = "/nwankwochibikescrumy/api/scrumusers/";
    if(this.confirmPassword == this.user.password){
        this.http.post(url, this.user).subscribe(
          data => {
            console.log(data)
            this.successMessage = "your account was created successfully";
            this.redirect = "/login";
            this.link = "go to login";
            this.router.navigateByUrl("success");
          },
          error1 => {
            console.log(error1)
            this.errorMessage = error1.statusText;
            this.redirect = "/signup";
            this.link = "try again";
            this.router.navigateByUrl("error");
          },
          ()=> console.log('completed')
        );
    }
  }

  login(){
    const url = "/nwankwochibikescrumy/api/users/";
    const url2 = "/nwankwochibikescrumy/api-token-auth/"
    let credentials = encodeURI(this.user.username+":"+this.user.password)
    let base64_credentials = btoa(credentials)

    // this.httpOtions.headers.append("Authorization", "Basic " + btoa(this.user.username+":"+this.user.password));
    let httpOtions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
      })
    }
    this.http.post(url2, {username: this.user.username, password: this.user.password}, httpOtions_).subscribe(
      data => {
        console.log("******^^^^^^^")
        console.log(data);
        // this.cookie.deleteAll();
        // localStorage.clear();

        let access_token = data['access'];
        let refresh_token = data['refresh'];

        let accessDecode = jwt_decode(access_token);
        // let userId = accessDecode['user_id'];
        // this.cookie.set('user_id', userId);


        this.cookie.set('access_token', access_token);
        this.cookie.set('refresh_token', refresh_token);
        this.cookie.set('first_name', accessDecode['first_name']);
        this.cookie.set('last_name', accessDecode['last_name']);
        this.cookie.set('username', accessDecode['username']);
        this.cookie.set('role', accessDecode['role']);



        // this.cookie.set('first_name', data['first_name']);
        // this.cookie.set('last_name', data['last_name']);
        // this.cookie.set('username', data['username']);
        // this.cookie.set('user_token', data['user_token']);
        // this.cookie.set('role', data['role']);

        console.log("done setting cookie")
        console.log(this.cookie.get('username'))
        },
      error1 => {
        console.log(error1);
        this.errorMessage = error1.error.detail;
        this.redirect = "/login";
        this.link = "go to login";
        this.router.navigateByUrl("error");
      },
      () => {
        this.isLoggedIn = this.checkLoggedInState();
        this.createUser();
        this.setUsers();
        this.router.navigateByUrl("scrumboard");
      }
    );
  }

  logout(){
    this.cookie.deleteAll();
    localStorage.clear();
    this.checkLoggedInState();
    this.createUser();
    this.router.navigateByUrl("");
  }

  checkLoggedInState(){
    // if(this.cookie.check('user_token')){
    //   console.log("here")
    //   this.isLoggedIn = true;
    //   this.createUser();
    //   this.router.navigateByUrl("scrumboard");
    // }
    // else{
    //   console.log("not logged in")
    //   this.isLoggedIn = false;
    //   this.router.navigateByUrl("");
    // }
    return this.cookie.check('access_token')
  }

  createUser(){
    if (this.checkLoggedInState()){
      this.user.firstname = this.cookie.get('first_name');
      this.user.lastname = this.cookie.get('last_name');
      this.user.username = this.cookie.get('username');
      this.user.role = this.cookie.get('role')
      console.log("create user")
    }
  }

  setUsers(){
    const url = "/nwankwochibikescrumy/api/users/";

    let token = this.getToken();

    let httpOtions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    this.http.get(url, httpOtions_).subscribe(
      (data: User[]) => {
        let x : User[] = data.map(user => {
          let newUser = new User();

          newUser.id = user['id']
          newUser.firstname = user['first_name']
          newUser.lastname = user['last_name']
          newUser.username = user['username']
          newUser.goals = user['goals']

          return newUser;
        });

        this.allUsers = x;
      },
      error1 => console.log(error1),
      () => {
        console.log("complete")
        console.log(this.allUsers)
      }
    )
    return this.allUsers;
  }

  private getToken() {
    let now = Date.now();
    let access_expiry_date = this.getExpiryDate(this.cookie.get('access_token'))
    let refresh_expiry_date = this.getExpiryDate(this.cookie.get('refresh_token'))

    let current_access_token = new Date(access_expiry_date * 1000)
    let current_refresh_token = new Date(refresh_expiry_date * 1000)

    if (current_refresh_token.getTime() > now){
        if(current_access_token.getTime() > now){
          console.log("access_token has not expired" + current_access_token.getTime(), current_refresh_token.getTime(), now)
          return this.cookie.get('access_token')
        }else{
          console.log("in get new token")
          return this.getNewToken();
        }
    }else{
      console.log("r: " + parseInt(this.cookie.get('access_token')) + ", now: " + now)
      console.log("refresh_token HAS expired")
      this.logout()
      return "";
    }
  }

  private getExpiryDate(token: string) {
    let decoded_token = jwt_decode(token);
    return decoded_token['exp']
  }


  private getNewToken() {
    let new_token = ""
    const url = "/nwankwochibikescrumy/api-token-auth/refresh/";

    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
      })
    }

    this.http.post(url,{'refresh': this.cookie.get('refresh_token')}, httpOptions_).subscribe(
      data => {
        new_token = data['access']
        console.log("about to set the new token")
        this.cookie.set('access_token', new_token)
        this.route("")
      },
      error1 => console.log(error1),
      () => {
        return new_token;
      }
    )

    console.log("returning the new token")

  }

  hostName = "http://localhost:4200/";

  getStatusList(){
    const url = "/nwankwochibikescrumy/api/status/";

    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.cookie.get('access_token')
      })
    }

    this.http.get(url, httpOptions_).subscribe(
      (data:[]) => {
        let statusList = data.map(status => {
          let statusObj = {}
          statusObj[status['id']] = status['status_name']
          statusObj['id'] = status['id'];
          statusObj['status_name'] = status['status_name'];
          return statusObj;
        });

        this.statusList = statusList;
      }
    )
  }

  createNewGoal(){
    const url = "/nwankwochibikescrumy/api/scrumgoals/";
    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
    this.http.post(url, this.goal, httpOptions_).subscribe(
      data => {
        console.log(data)
        this.successMessage = "New goal was successfully created";
        this.redirect = "/scrumboard";
        this.link = "back to scrumboard"
        this.router.navigateByUrl("success");
      },
      error1 => {
        console.log(error1);
        this.errorMessage = error1.statusText;
        this.redirect = "/add-goal";
        this.link = "back to goal creation form"
        this.router.navigateByUrl("error");
      },
      () => console.log('completedx')
    );
  }

  deleteGoal(id: number, goal_random_id:number){
    alert("this goal with id: "+ goal_random_id +" has been deleted.")
    const url = "/nwankwochibikescrumy/api/scrumgoals/" + id + "/";
    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    this.http.delete(url, httpOptions_).subscribe(
      data => console.log(data),
      error1 => console.log(error1.statusText),
      () => {
        this.route("scrumboard")
      }
    );
  }


  moveGoal(goal_id: any, move_id){
    const url = "/nwankwochibikescrumy/api/scrumgoals/" + goal_id + "/";
    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken(),
        'custom-mode': 'move'
      })
    };

    this._http.patch(url, {"goal_status":move_id}, httpOptions_, ).subscribe(
      data => console.log(data),
      error1 => console.log(error1),
      () => {
        this.route("scrumboard")
      }
    )

  }

  changeGoalOwner(goal_id, new_owner){
    const url = "/nwankwochibikescrumy/api/scrumgoals/" + goal_id + "/"
    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken(),
        'custom-mode': 'change_owner'
      })
    };

    this._http.put(url, {"user_id":new_owner}, httpOptions_).subscribe(
      data => {
        console.log(data)
      },
      error1 => {
        console.log(error1)
      },
      () => {
        console.log("completed")
        this.route("")
      }
    )
  }

  editGoalText(goal_id: any, goal_text){
    const url = "/nwankwochibikescrumy/api/scrumgoals/" + goal_id + "/";
    let httpOptions_ = {
      headers : new HttpHeaders({
        'Content-Type': 'Application/json',
        'Authorization': 'Bearer ' + this.getToken(),
        'custom-mode': 'edit_goal_name'
      })
    };

    this._http.put(url, {"goal_name":goal_text}, httpOptions_, ).subscribe(
      data => console.log(data),
      error1 => console.log(error1),
      () => {
        this.route("")
      }
    )
  }

  route(routeName: string){
    this.router.navigateByUrl(routeName)
  }

}

