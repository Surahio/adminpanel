#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]
  pub mod SMTP_EZH;
  pub mod LogReg;
  pub mod Subscriptions;
  use serde::{Deserialize, Serialize};
  use reqwest::{header::{USER_AGENT, HeaderMap, HeaderValue, AUTHORIZATION}, Client};
  use serde_json::{json, Value};
  use tokio::main;
  
  
  #[derive(Serialize, Deserialize, Debug)]
  struct User {
      email: String,
      name: String,
      password: String,
      sub_type: i32, //0 = free, 1 = paid, 2 =pro
      twofa: bool,
      verified: bool,
      datasets: String,
  }
  
  // use std::collections::HashMap;
  // use crate::NER_EZH::{Git_Repo_Info, experience};
  
  // #[derive(Serialize, Deserialize, Debug)]
  // pub struct Candidate2 {
  //     // Personal Info
  //     name: String,
  //     phone: String,
  
  //     // Crux
  //     skills: HashMap<String, i32>,
  //     institutes: Vec<String>,
  //     workexp: experience,
  //     git_repos: Vec<Git_Repo_Info>,
  
  //     // Socials
  //     github: String,
  //     git_username: String,
  //     linkedin: String,
  
  //     // Metadata
  //     template: String,
  //     tokens: Vec<String>,
  // }
  struct filepath {
      path: String,
  }
  
  #[derive(Serialize, Deserialize, Debug)]
  struct Response {
      name: String,
  }
  
  #[derive(Serialize, Deserialize, Debug)]
  struct Confirmation {
      value: bool,
      response: String,
  }
  
  #[derive(Serialize, Deserialize, Debug)]
  struct Confirmation_Login {
      value: bool,
      response: String,
      TWO_FA: bool,
  }
  
  #[derive(Serialize, Deserialize, Debug)]
  struct User_Fetch {
      value: bool,
      user: User,
  }
  
  
  #[derive(Serialize, Deserialize, Debug)]
  struct SMTP_CRED{
      user:String,
      pass:String,
  }
  struct User_Login {
      value: bool,
      twofa: bool,
      hash: String,
  }
  
  #[derive(Serialize, Deserialize, Debug)]
  struct V_Code{
  
      email:String,
      vcode:String
  
  }
  
  
  #[tokio::main]
  
  async fn main() {
    tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
        LogReg::create_user,
        LogReg::login_user, 
        LogReg::match_vcode, 
        LogReg::match_2fa,
        LogReg::remember_me_token, 
        Subscriptions::sub,
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
  }
  