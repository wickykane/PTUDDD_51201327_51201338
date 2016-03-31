
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
   // alert("chrome");
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    alert("IE");
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function updaterequest(id,name,email,password) {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://localhost:8080/restful-java/DoubleH/update';
  var xhr = createCORSRequest('PUT', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function() {
    var result = xhr.responseText;
       if(result==="1") {
           
            $("#status3").html("Update successfully!!!");
            getlistuser('admin:admin');
        
        } else if(result==="2") {
               $("#status3").html("Username has existed!!!");
            
        }
        else {
            $("#status3").html("There is an error. Please try again!!!");
        }
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
 
  xhr.send(JSON.stringify({
                         email: email,
                         floatX: 0,
                         floatY: 0,
                         id: id,
                         password: password,
                         status: 1,
                         name: name
                         }));
}

function insert(name,username,email,password){
    // All HTML5 Rocks properties support CORS.
  var result;
  var url = 'http://localhost:8080/restful-java/DoubleH/add';
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function() {
    result = xhr.responseText;
        if(result==="1") {
            $("#loading").html("");
              //$( "#cancel2" ).trigger( "click" );
            $("#signup_form")[0].reset();
            $("#existuser").html("Create successfully!!!");
            $("#signup_form")[0].reset();
            $("#cancel2" ).trigger( "click" );
            $("#myusername").val(username);
            $("#mypwd").val(password);
            signin();
        } else if(result==="2") {
               $("#existuser").html("User existed!!!");
            
        }
        else {
            $("#existuser").html("User existed!!!");
        }
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(JSON.stringify({
                         email: email,
                         floatX: 0,
                         floatY: 0,
                         name: name,
                         password: password,
                         username: username,
                         image: "http://bootdey.com/img/Content/user_1.jpg"
                         }));

}

function deleterequest(id){
    // All HTML5 Rocks properties support CORS.
  var url = 'http://localhost:8080/restful-java/DoubleH/delete';
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function() {
    var result = xhr.responseText;
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url);
   // alert(result + result==1);
    if(result === '1')  getlistuser('admin:admin');
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(JSON.stringify({
                         id: id
                         }));
}
