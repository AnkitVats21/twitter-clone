// import Base from "antd/lib/typography/Base";
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';

// const BASE_URL = "http://127.0.0.1:8000/";

const BASE_URL = "http://84f6e0f316f3.ngrok.io/";

class ServerService {

    login(data){
       return axios.post(BASE_URL + 'api/login/', data)
    }

    signup(data){
      return axios.post(BASE_URL + 'api/signup/', data) 
   }

    otp(data){
      return axios.post(BASE_URL + 'api/verifyotp/', data)
   }

   resetotp(data){
    return axios.post(BASE_URL + 'api/verifyotp/', data)
 }


    forgotpassword(data){
      return axios.post(BASE_URL + 'api/otp/send/',data)
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

   likedusers(data){
     return axios.get(BASE_URL+'api/likes/'+data+'/',
     {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
         }
         
     }
     )
   }

   trending(){
    return axios.get( BASE_URL +'api/trending/hashtags/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  }
    )
   }

   connect(data){
    return axios.get(BASE_URL +'api/connections/'+data+'/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      
  }
    )
   }

   myposts(){
    return axios.get(BASE_URL + 'api/usertweets/self/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  }
    )
   }

   otherposts(data){
    return axios.get(BASE_URL + 'api/usertweets/' +data+'/' ,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  }
    )
   }

   editprofile(data){
     return axios.post( BASE_URL + '/api/post/', data,
     {
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
       }
       
   })
   }

   editprofilebtn(data){
    return axios.patch( BASE_URL +'api/updateprofile/' ,data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  })
   }

   newchat(data){
    return axios.post(BASE_URL+ 'api/chats/', data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  })
   }

   recentchats(){
    return axios.get(BASE_URL +'api/chats/ ',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  })
   }

   editpost(uid, data){
    return axios.patch( BASE_URL +'api/tweet/' + uid + '/',data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  })
   }

   bookmarkedposts(){
    return axios.get(BASE_URL +'api/bookmarks/all/',
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  }
    )
   }

   posttweet(data){
    return axios.post( BASE_URL + 'api/post/',data,
    {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
      
  })
   }

   resendotp(resenddata){
    return axios.post(BASE_URL + 'auth/register/otp/resend/',resenddata)
   }

   resetpass(resenddata){
    return axios.post(BASE_URL + 'api/resetpass/',resenddata)
   }

    homecards(){
      return axios.get(BASE_URL+ 'api/feeds/',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    addcomment(data){
      return axios.post(BASE_URL+ 'api/comment/comment/', data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    addreply(data){
      return axios.post(BASE_URL+ 'api/comment/reply/', data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    postcomment(data){
      return axios.get(BASE_URL +"api/tweet/"+data+"/",
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    
}
  )
    }

    userdetails(){
      return axios.get(BASE_URL+ 'api/profile/',
      {
         headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
         }
         
     }
      )
    }

    notifications(){
      return axios.get(BASE_URL + 'api/notifications/',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
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

    otherdetails(data){
      return axios.get(BASE_URL+ 'api/userprofile/'+data+'/',
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

    searchpage(data){
      return trackPromise(axios.get(BASE_URL + 'api/search/?query='+data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      ))
    }

    searchnew(data){
     return axios.get( BASE_URL + 'api/search/?query='+data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
      )
    }

    deletepost(data){
      return axios.delete(BASE_URL +'api/tweet/delete/'+ data + '/',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }    
      )
    }



    following(){
      return axios.get(BASE_URL+'api/user/following/?user=self',
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
     }
      )
}

followers(){
 return axios.get(BASE_URL+'api/user/follower/?user=self',
 {
   headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('access_token')}`
   }
   
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

postretweet(data){
  return axios.post( BASE_URL +'api/retweet/',data,
  {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    
})
}


    bookmark(pk, data){
      return axios.post(BASE_URL + 'api/bookmarks/'+ pk+'/',data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
    )
   }

    like(pk, data){
      return axios.post(BASE_URL + 'api/likes/'+ pk+'/',data,
      {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        
    }
    )
   }

}
  
  export default new ServerService();