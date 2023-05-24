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

#[tauri::command]
pub async fn sub(name:String, discount:f32, price:f32, currency:String, is_discounted:bool, feature:String,timespan:String){

    let y = randomizer();
    let features_delim=split_by_comma(&feature);

    let mut x = Subscription::new();
    x.set_id(y.clone().to_string());
    x.set_name(name);
    x.set_discount(discount);
    x.set_price(price);
    x.set_currency(currency);
    x.set_discounted(is_discounted);
    x.set_features(features_delim);
    x.set_timespan(timespan);
    println!("{:?}",x);

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
        
            url.push_str("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/Subscriptions/");
            url.push_str(&random);
            url.push_str(".json");
        
            return url;
        
    } 


#[derive(Serialize, Deserialize, Debug)]
pub struct Subscription{
    id:String,
    name:String,
    desc:String,
    discount:f32,
    price:f32,
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
        self.discount=0.00;
        self.price=0.00;
        self.currency="RUB".to_owned();
        self.is_discounted=false;
        self.features=Vec::new();
        self.features_desc=Vec::new();
        self.timespan="Monthly".to_owned();
    }

    pub fn new()->Subscription{

        return Subscription{
            id:"".to_owned(),
            name:"".to_owned(),
            desc:"".to_owned(),
            discount:0.00,
            price:0.00,
            currency:"RUB".to_owned(),
            is_discounted:false,
            features:Vec::new(),
            features_desc:Vec::new(),
            timespan:"Monthly".to_owned(),
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

    pub fn set_discount(&mut self, text:f32){
        self.discount = text;
    }

    pub fn set_price(&mut self, text:f32){
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
        discount:0.00,
        price:0.00,
        currency:"RUB".to_owned(),
        is_discounted:false,
        features:Vec::new(),
        features_desc:Vec::new(),
        timespan:"Monthly".to_owned(),
    }

}

async fn url_generator(obj:&Subscription) -> String{

    let mut url = String::from("");

    url.push_str("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/Subscriptions/");
    url.push_str(&sha256::digest(obj.id.clone()));
    url.push_str(".json");

    return url;

}

async fn url_generator_id(obj:String) -> String{

    let mut url = String::from("");

    url.push_str("https://ezhire-c4044-default-rtdb.asia-southeast1.firebasedatabase.app/Subscriptions/");
    url.push_str(&sha256::digest(obj));
    url.push_str(".json");

    return url;

}

pub async fn publish(obj:&Subscription, client:&Client){

    let url = url_generator(obj).await;
    let data = serde_json::to_string(obj).unwrap();

    let r1 = client.put(&url).body(data).send().await.unwrap();

}

pub async fn delete(id:String,  client:&Client){

    let url = url_generator_id(id).await;
    println!("{}", &url);

    let r0 = client.get(&url).send().await.unwrap().text().await.unwrap();

    match r0.as_str(){

        "null" => {
            println!("Subscription not found!");
        }
        _=>{
            println!("Delete Success!");
        }

    }

    client.delete(&url).send().await.unwrap();
}