import axios from "axios";

const BASE_URL = "https://094e16fb78ae.ngrok.io/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'api/token/', data)
    }

    signup(data){
      return axios.post(BASE_URL + 'auth/register/', data) 
   }

    otp(data){
      return axios.post(BASE_URL + 'auth/register/otp/', data)
   }

    forgototp(data){
      return axios.post(BASE_URL + 'auth/forgot-password/otp/',data)
   }

    forgotform(data){
      return axios.post(BASE_URL + 'auth/forgot-password/',data)
   }

    passresetform(data){
      return axios.post(BASE_URL + 'auth/forgot-password/new-password/',data)
   }

   followtoggle(data){
   return  axios.post(BASE_URL + 'user/follow/',data,
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        
    }
    )
   }

   resendotp(resenddata){
    return axios.post(BASE_URL + 'auth/register/otp/resend/',resenddata)
   }

    homecards(){
      return axios.get(BASE_URL)
    }

    profilepicture(formdata){
    return  axios.put(BASE_URL + 'user/change-profile/',formdata,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            
        }
        )
    }

    otheruser(data){
      return axios.get(BASE_URL+ 'user/' +data+'/',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    suggestions(data){
    return axios.post( BASE_URL+'recipe/suggestion/',data,
        {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
          
      })
    }

    userdetails(){
      return axios.get(BASE_URL+ 'my-account/',
      {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
         }
         
     }
      )
    }

    searchpage(data){
      return axios.post(BASE_URL + 'search/',data)
    }

    readrecipe(data){

if(localStorage.getItem('access_token')){
  return axios.get(BASE_URL + 'recipe/'+ data+'/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )

}

else{
  return axios.get(BASE_URL + 'recipe/'+ data+'/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ``
    },
    
}
  )
}

}


  addrecipe(formdata){

  return axios.post(BASE_URL + 'recipe/post/', formdata,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
  }

  editrecipe(formdata,recipeid){
  return axios.put(BASE_URL+ 'recipe/'+recipeid+'/' , formdata,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      
  }
    )
  }


  myrecipes(){

  return axios.get(BASE_URL + 'user/recipe-list/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }   
}
  )
  }

    deletepost(deletepk){
      return axios.delete(BASE_URL +'recipe/'+ deletepk+'/',

      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        
    }
      
      )
    }


    sort(sortdata){
      return axios.post(BASE_URL + 'search/sort/',sortdata)
    }



    following(){
    return axios.get( BASE_URL +'user/following-list/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      
  }
    )
}

followers(){
 return axios.get(BASE_URL + 'user/follower-list/',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )
}


bookmarklist(){
  return axios.get(BASE_URL + 'user/bookmark-list',
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )
}

    starters(){
      return axios.get(BASE_URL +'starters/')
    }

    maincourse(){
      return axios.get(BASE_URL +'main-course/')
    }
    
    desserts(){
      return axios.get(BASE_URL +'desserts/')
    }

    drinks(){
      return axios.get(BASE_URL +'drinks/')
    }

    others(){
      return axios.get(BASE_URL +'others/')
    }

    bookmark(data){
      return axios.post(BASE_URL + 'recipe/bookmark/', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

    like(data){
      return axios.post(BASE_URL + 'recipe/like/', data,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          
      }) 
    }

}
  
  export default new ServerService();