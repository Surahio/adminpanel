use reqwest::Client;
use serde::{Serialize, Deserialize};
use serde_json::{Value};

use rand::Rng;

fn randomizer()->i32 {
    // Create a random number generator
    let mut rng = rand::thread_rng();

    // Generate a random number between 1 and 100
    let random_number = rng.gen_range(1..=1000000);

    random_number
}
pub async fn url_generator_sub()-> String{
    let mut url = String::from("");

    url.push_str("https://test-2fca3-default-rtdb.firebaseio.com/Subscriptions/");
    url.push_str(".json");

    return url;
}

pub async fn url_generator_sub_remove(random:String)-> String{
    let mut url = String::from("");

    url.push_str("https://test-2fca3-default-rtdb.firebaseio.com/Subscriptions/");
    url.push_str(&random);
    url.push_str(".json");

    return url;
}

// use firebase::Firebase;

pub async fn x_remove(random: String){
    let client = Client::builder().build().unwrap();

    let url = fetch_keys().await;

    let r1 = client.get(&url).send().await.unwrap();
    let result = r1.text().await.unwrap();        
    let mut to_add = result;
    // to_add.push_str(",");
    // to_add.push_str(&random);
    let yolo=to_add.replace(&random,"")
    .trim_matches('"')  // Remove leading and trailing double quotes
        .replace(",","")
        .replace("\\", "")  // Remove backslashes
        .replace("\"", "");
    let client = Client::builder().build().unwrap();
    let url = x_url().await;
    let y = add_x {
        keys: yolo,
    };
    let data = serde_json::to_string(&y).unwrap();
    let r1 = client.put(&url).body(data).send().await.unwrap();
}

#[tauri::command]
pub async fn remove_sub(random: String) {

    x_remove(random.clone()).await;
    let client = Client::builder().build().unwrap();

    let url = url_generator_sub_remove(random).await;

    let r1 = client.get(&url).send().await.unwrap();
    let response_json: serde_json::Value = r1.json().await.unwrap();

    let key = match response_json.as_object().and_then(|obj| obj.keys().next()) {
        Some(key) => key.to_string(),
        None => {
            println!("Error: Response JSON doesn't contain any keys.");
            return;
        }
    };

    let delete_url = format!("{}?{}={}", &url, key, "null"); // Create the delete URL

    let _response = client.delete(&delete_url).send().await.unwrap();
}

#[tauri::command]
pub async fn reader()-> String{
    let client = Client::builder().build().unwrap();

    let url = url_generator_sub().await;

    let r1 = client.get(&url).send().await.unwrap();
    let result = r1.text().await.unwrap(); 
    return result;
}

#[tauri::command]
// pub async fn sub(name:String, discount:String, price:String, currency:String, is_discounted:bool, feature:String,timespan:String){
pub async fn sub(name:String, discount:String, price:String, currency:String, is_discounted:bool, feature:Vec<String>,timespan:String){

    let y = randomizer();
    // let features_delim=split_by_comma(&feature);

    let mut x = Subscription::new();
    x.set_id(y.clone().to_string());
    x.set_name(name);
    x.set_discount(discount);
    x.set_price(price);
    x.set_currency(currency);
    x.set_discounted(is_discounted);
    x.set_features(feature);
    x.set_timespan(timespan);
    println!("{:?}",x);

    x_into_db(y.clone().to_string()).await;

    let client = Client::builder().build().unwrap();

    let url = push_sub_url(y.clone().to_string()).await;
    let data = serde_json::to_string(&x).unwrap();

    let r1 = client.put(&url).body(data).send().await.unwrap();

    }

    fn split_by_comma(s: &str) -> Vec<String> {
        s.split(',').map(|x| x.trim().to_string()).collect()
    }

    pub async fn push_sub_url(random:String) -> String{

            let mut url = String::from("");
        
            url.push_str("https://test-2fca3-default-rtdb.firebaseio.com/Subscriptions/");
            url.push_str(&random);
            url.push_str(".json");
        
            return url;
        
    } 


#[derive(Serialize, Deserialize, Debug)]
pub struct Subscription{
    id:String,
    name:String,
    desc:String,
    discount:String,
    price:String,
    currency:String,
    is_discounted:bool,
    features:Vec<String>,
    features_desc:Vec<String>,
    timespan:String
}

impl Subscription{

    pub fn reset(&mut self){
        self.id="".to_owned();
        self.name="".to_owned();
        self.desc="".to_owned();
        self.discount="".to_owned();
        self.price="".to_owned();
        self.currency="".to_owned();
        self.is_discounted=false;
        self.features=Vec::new();
        self.features_desc=Vec::new();
        self.timespan="".to_owned();
    }

    pub fn new()->Subscription{

        return Subscription{
            id:"".to_owned(),
            name:"".to_owned(),
            desc:"".to_owned(),
            discount:"".to_owned(),
            price:"".to_owned(),
            currency:"".to_owned(),
            is_discounted:false,
            features:Vec::new(),
            features_desc:Vec::new(),
            timespan:"".to_owned(),
        }

    }    
    pub fn set_id(&mut self, text:String){
        self.id = text;
    }

    pub fn set_name(&mut self, text:String){
        self.name = text;
    }

    pub fn set_desc(&mut self, text:String){
        self.desc = text;
    }

    pub fn set_discount(&mut self, text:String){
        self.discount = text;
    }

    pub fn set_price(&mut self, text:String){
        self.price = text;
    }

    pub fn set_currency(&mut self, text:String){
        self.currency = text;
    }

    pub fn set_discounted(&mut self, text:bool){
        self.is_discounted = text;
    }

    pub fn set_timespan(&mut self, text:String){
        self.timespan= text;
    }

    pub fn set_features(&mut self, mut array: Vec<String>){
        self.features = array;
    }

    pub fn set_features_desc(&mut self, mut array: Vec<String>){
        self.features_desc = array;
    }

    pub fn clear_features(&mut self){
        self.features = Vec::new();
    }

    pub fn append_features(&mut self, text:String){
        self.features.push(text);
    }

    pub fn append_features_desc(&mut self, text:String){
        self.features_desc.push(text);
    }

    pub fn clear_features_desc(&mut self){
        self.features_desc = Vec::new();
    }
    
    

}

pub async fn basic() -> Subscription{

    return Subscription{
        id:"".to_owned(),
        name:"".to_owned(),
        desc:"".to_owned(),
        discount:"".to_owned(),
        price:"".to_owned(),
        currency:"".to_owned(),
        is_discounted:false,
        features:Vec::new(),
        features_desc:Vec::new(),
        timespan:"".to_owned(),
    }

}

// async fn url_generator(obj:&Subscription) -> String{

//     let mut url = String::from("");

//     url.push_str("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/Subscriptions/");
//     url.push_str(&sha256::digest(obj.id.clone()));
//     url.push_str(".json");

//     return url;

// }

// async fn url_generator_id(obj:String) -> String{

//     let mut url = String::from("");

//     url.push_str("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/Subscriptions/");
//     url.push_str(&sha256::digest(obj));
//     url.push_str(".json");

//     return url;

// }

// pub async fn publish(obj:&Subscription, client:&Client){

//     let url = url_generator(obj).await;
//     let data = serde_json::to_string(obj).unwrap();

//     let r1 = client.put(&url).body(data).send().await.unwrap();

// }

// pub async fn delete(id:String,  client:&Client){

//     let url = url_generator_id(id).await;
//     println!("{}", &url);

//     let r0 = client.get(&url).send().await.unwrap().text().await.unwrap();

//     match r0.as_str(){

//         "null" => {
//             println!("Subscription not found!");
//         }
//         _=>{
//             println!("Delete Success!");
//         }

//     }

//     client.delete(&url).send().await.unwrap();
// }

#[derive(Serialize, Deserialize, Debug)]
pub struct add_x{
    keys:String
}

#[tauri::command]
pub async fn x_into_db(random: String) {
    let wired = reader_x().await;


    if wired == "null" {
        let client = Client::builder().build().unwrap();
        let url = x_url().await;
        let y = add_x {
            keys: random,
        };
        let data = serde_json::to_string(&y).unwrap();
        let r1 = client.put(&url).body(data).send().await.unwrap();
    } else {
        let client = Client::builder().build().unwrap();

        let url = fetch_keys().await;
    
        let r1 = client.get(&url).send().await.unwrap();
        let result = r1.text().await.unwrap();        
        let mut to_add = result;
        to_add.push_str(",");
        to_add.push_str(&random);
        let client = Client::builder().build().unwrap();
        let url = x_url().await;
        let y = add_x {
            keys: to_add,
        };
        let data = serde_json::to_string(&y).unwrap();
        let r1 = client.put(&url).body(data).send().await.unwrap();
    }
}
 

pub async fn fetch_keys()->String{
    let mut url = String::from("");
    url.push_str("https://test-2fca3-default-rtdb.firebaseio.com/x/keys/");
    url.push_str(".json");
    return url;
}

pub async fn x_url() -> String{

    let mut url = String::from("");

    url.push_str("https://test-2fca3-default-rtdb.firebaseio.com/x/");
    url.push_str(".json");

    return url;

} 


pub async fn reader_x()-> String{
    let client = Client::builder().build().unwrap();

    let url = x_url().await;

    let r1 = client.get(&url).send().await.unwrap();
    let result = r1.text().await.unwrap(); 
    return result;
}
#[derive(Serialize, Deserialize, Debug)]
pub struct send{
    message:String
}

#[derive(Serialize, Deserialize, Debug)]

pub struct send2{
    message:Vec<String>,
}
#[tauri::command]
pub async fn showcase_x()-> String{
    let client = Client::builder().build().unwrap();

        let url = fetch_keys().await;
    
        let r1 = client.get(&url).send().await.unwrap();
        let result = r1.text().await.unwrap();   // x is hereeeeee

            let json_value = serde_json::Value::String(result);
            // println!("{:?}",json_value);
            let json_string = serde_json::to_string(&json_value).unwrap();
            let vcs= extract_numbers(&json_string);
            // json_string
        let newer=send2{
            message:vcs,
        };
        let json_string = serde_json::to_string(&newer).unwrap();
    json_string
}

fn extract_numbers(input: &str) -> Vec<String> {
    let clean_string = input
        .trim_matches('"')  // Remove leading and trailing double quotes
        .replace("\\", "")  // Remove backslashes
        .replace("\"", "");  // Replace double quotes with a space

    let numbers: Vec<String> = clean_string
        .split(',')
        .map(|num_str| num_str.to_string())
        .collect();

    numbers
}


#[tauri::command]
pub async fn showcase_sub()-> String{

        let client = Client::builder().build().unwrap();

        let url = url_generator_sub().await;
    
        let r1 = client.get(&url).send().await.unwrap();
        let result = r1.text().await.unwrap();   // subssss

        // let json_value = serde_json::Value::String(result);
        // println!("{:?}",json_value);

        let newer=send{
            message:result,
        };
        let json_string = serde_json::to_string(&newer).unwrap();
        json_string
}
































// use std::collections::HashMap;

// #[tauri::command]
// pub async fn sth() {
//     let str1 = reader().await; // Assuming you have a function to read the JSON string
//     let json_value: Value = serde_json::from_str(&str1).unwrap();
//     let mut hashmap: HashMap<String, String> = HashMap::new();

//     convert_json_to_hashmap(&mut hashmap, json_value).await;

//     // Now you can use the hashmap as needed
// }

// pub async fn convert_json_to_hashmap(hashmap: &mut HashMap<String, String>, value: Value) {
//     match value {
//         Value::String(value_str) => {
//             hashmap.insert(String::new(), value_str); // Use an appropriate key for your case
//         }
//         Value::Number(value_num) => {
//             hashmap.insert(String::new(), value_num.to_string()); // Use an appropriate key for your case
//         }
//         Value::Bool(value_bool) => {
//             hashmap.insert(String::new(), value_bool.to_string()); // Use an appropriate key for your case
//         }
//         Value::Array(array) => {
//             for (index, item) in array.iter().enumerate() {
//                 let key = format!("{}[{}]", String::new(), index); // Use an appropriate key format for your case
//                 convert_json_to_hashmap(hashmap, item.clone()).await;
//                 hashmap.insert(key, item.to_string());
//             }
//         }
//         Value::Object(obj) => {
//             for (key, value) in obj {
//                 let key = format!("{}[{}]", String::new(), key); // Use an appropriate key format for your case
//                 convert_json_to_hashmap(hashmap, value.clone()).await;
//                 hashmap.insert(key, value.to_string());
//             }
//         }
//         _ => {
//             // Handle other value types if needed
//         }
//     }
// }
