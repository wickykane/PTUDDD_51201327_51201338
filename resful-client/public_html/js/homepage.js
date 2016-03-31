
window.onload = function() {
    if(localStorage.getItem("isadmin")==='1') {
        getlistuser("admin:admin");
    }
    if(localStorage.getItem("myavatar")!= "null" && localStorage.getItem("myavatar") != null) {
         $(".my-profile-image").attr("src",localStorage.getItem("myavatar"));
    }
};

function goprofile(){
   var myinfo = JSON.parse(localStorage.getItem("myinfo"));
   myid= "Profile.html?id=" + myinfo.id;
 //  location.href= myid;
   location.href= "Profile.html";
}

function getinfo(dom){
    $("#edit_form")[0].reset();
    $("#blank_name3").hide();
    $("#blank_email3").hide();
    $("#blank_pwd3").hide();
    $("#blank_repwd3").hide();
    $("#dontmatch3").hide();
    $("#status3").html("");
    var myid = dom.parentNode.parentNode.id;
    myid=myid.substring(8,myid.length);
    var json = localStorage.getItem('userlist_json');
     if (json !== null ) { 
       json = JSON.parse(json);
       $.each(json,function(i,item){
           if(item.id===parseInt(myid)){
                 $("#myname3").val(item.name);  
                 $("#myusername3").val(item.username);
                 $("#myemail3").val(item.email);
                 $("#mypwd3").val(item.password);
                 $("#myid3").val(item.id);
                  return;
           }
       });
   }
   else
   if(json===null){
     $.ajax({
             url: "http://localhost:8080/restful-java/DoubleH/getuser/"+myid,
            method: "GET",       
                    xhrFields: {
                        withCredentials: false
                    }
                }).done(function (data) {
                    $("#myname3").val(data.name);  
                    $("#myusername3").val(data.username);
                    $("#myemail3").val(data.email);
                    $("#mypwd3").val(data.password);
                    $("#myid3").val(data.id);
                });
            }
    
}

function deleteuser(dom){
    var myid = dom.parentNode.parentNode.id;
    myid=myid.substring(8,myid.length);
    //alert(myid);
  $("#loading-list-user").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
  $("#loading-list-user").show();
    deleterequest(myid);
}

function detail(dom){
    var myid = dom.parentNode.parentNode.id;
    myid=myid.substring(8,myid.length);
    //alert(myid);
      var json = localStorage.getItem('userlist_json');
   
   //console.log(JSON.parse(json)); 
   if (json !== null )
   { 
       json = JSON.parse(json);
       $.each(json,function(i,item){
           if(item.id===parseInt(myid)){
                 $("#myname4").val(item.name);  
                 $("#myusername4").val(item.username);
                 $("#myemail4").val(item.email);
                 $('#myname4').attr('disabled', 'disabled');
                 $('#myusername4').attr('disabled', 'disabled');
                 $('#myemail4').attr('disabled', 'disabled');
                  return;
               
           }
           
       });
      
   }
   else
   if(json===null){
     $.ajax({
             url: "http://localhost:8080/restful-java/DoubleH/getuser/"+myid,
            method: "GET",       
                    xhrFields: {
                        withCredentials: false
                    }
                }).done(function (data) {
                    $("#myname4").val(data.name);  
                 $("#myusername4").val(data.username);
                 $("#myemail4").val(data.email);
                 $('#myname4').attr('disabled', 'disabled');
                 $('#myusername4').attr('disabled', 'disabled');
                 $('#myemail4').attr('disabled', 'disabled');
                });
            }
}

function getlistuser(up){
         $.ajax({
                        url: "http://localhost:8080/restful-java/DoubleH/getuser/all",
                        method: "GET",
                        xhrFields: {
                            withCredentials: false
                        },
                        beforeSend: function (xhr) {
                            
                            $("#loading-list-user").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
                            $("#loading-list-user").show();
                            $("#admin-list-user").show();
                            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(up));                   
                        }
                }).done(function (data) {
                    //alert(data);
                   // console.log(data);
                   var myappend="",myappend2="";
                    myappend += ' <h1 class="text-danger">USERS MANAGER</h1>';
                    myappend += '  <div class="row list-user"> <div class="col-lg-12"><div class="main-box no-header clearfix">';
                    myappend += '  <div class="main-box-body clearfix"> <div class="table-responsive">   <table class="table user-list">';
                    myappend += '<thead><tr><th><span>User</span></th><th class="text-center"><span>Status</span></th><th class="text-center"><span>Email</span></th><th>&nbsp;</th></tr></thead><tbody>';
                      //  $("#admin-list-user").append('');
                    $.each(data, function (i, item) {
                        //atob(item.image);
                        //document.body.appendChild(image);
                        var member="Member", status ="active",image="http://bootdey.com/img/Content/user_1.jpg";
                        if(item.status === 3) member= "Admin";
                        if(item.status === 0) status ="inactive";
                        if(item.image != 'null' && item.image != null) image = item.image;
                        myappend2 += '<tr id="user_id_'+item.id+'"><td><img src="'+ image +'" alt="image">';
                        myappend2 += '<a href="#" class="user-link">'+item.username+'</a>';
                        myappend2 += ' <span class="user-subhead">'+ member +'</span>';
                        myappend2 += ' </td>';
                        myappend2 += '<td class="text-center"> <span class="label label-primary">'+status+'</span></td>';
                        myappend2 += '<td><a href="#">'+ item.email +'</a></td>';
                        myappend2 += '<td style="width: 20%;">';
                        myappend2 += '                            <a data-toggle="modal" href="#myModal4" onclick="detail(this);" class="table-link">';
                        myappend2 += '                            <span class="fa-stack">';
                        myappend2 += '<i class="fa fa-square fa-stack-2x"></i>';
                        myappend2 += '<i class="fa fa-search-plus fa-stack-1x fa-inverse"></i></span></a>';
                        myappend2 += '<a data-toggle="modal" href="#myModal3" class="table-link" onclick="getinfo(this);">';
                        myappend2 += '<span class="fa-stack"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-pencil fa-stack-1x fa-inverse"></i></span></a>';
                        myappend2 += '<a href="javascript:void(0)"  onclick="deleteuser(this);" class="table-link danger"><span class="fa-stack"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-trash-o fa-stack-1x fa-inverse"></i></span></a></td></tr>';
                
                    });
                      myappend2 += '</tbody></table></div></div> </div></div></div>';
                      $("#admin-list-user").html("");
                      $("#admin-list-user").append(myappend + myappend2);
                       localStorage.setItem("userlist",  $("#admin-list-user").html());
                       localStorage.setItem("userlist_json", JSON.stringify(data));
                      $("#loading-list-user").html("");
                      $("#loading-list-user").hide();
                });
    
}

function getjsonuser(username,password){   
  var result;
  var url = 'http://localhost:8080/restful-java/DoubleH/getuser';
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function() {
    result = xhr.responseText;
    localStorage.setItem("myinfo",result);
    var json = JSON.parse(result);
    localStorage.setItem("myavatar",json.image);
    $(".my-profile-image").attr("src",json.image);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(JSON.stringify({
                         password: password,
                         username: username
                         }));
}

function signin(){
    document.execCommand("ClearAuthenticationCache");
    var username= $("#myusername").val(),password=$("#mypwd").val();
    if(username==="") $("#blank_username").show(); else $("#blank_username").hide();
    if(password==="") $("#blank_pwd").show(); else $("#blank_pwd").hide();
    if(username!=="" && password !=="") {
        var up=username+":"+password;
         $.ajax({
             url: "http://localhost:8080/restful-java/DoubleH/user/signup",
            method: "GET",       
                    xhrFields: {
                        withCredentials: false
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(up));
                        $("#loading").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
                    }
                }).done(function (data) {
                    $("#loading").html("");
                    if(data!=='' && data !=='0') {
                        getjsonuser(username,password);
                        $( "#cancel" ).trigger( "click" );
                        $(".hide-signup").hide();
						$(".show-signup").show();
                        $(".profile-avatar").show();
                        localStorage.setItem("islogin", 1);
                        //Wgetjsonuser(username,password); //Luu thong tin cua user dang nhap
                    }
                    /*********If admin - show user manager******/
                    if(data==="3"){     
                       localStorage.setItem("isadmin", 1);
                       getlistuser(up);
                   }
                    if(data==="0"){
                          $("#loading").html("Wrong account!!!");
                    }
                });  
    }
    return;
}

function signup(){
    var username= $("#myusername2").val(),password=$("#mypwd2").val(),name=$("#myname2").val(),email=$("#myemail2").val(),repwd=$("#myrepwd2").val();
    if(name==="") $("#blank_name2").show(); else $("#blank_name2").hide();
    if(username==="") $("#blank_username2").show(); else $("#blank_username2").hide();
    if(email==="") $("#blank_email2").show(); else $("#blank_email2").hide();
    if(password==="") $("#blank_pwd2").show(); else $("#blank_pwd2").hide();
    if(repwd==="") $("#blank_repwd2").show(); else $("#blank_repwd2").hide();
    if(password!== repwd) $("#dontmatch").show(); else $("#dontmatch").hide();
    if(name !=="" && username!=="" && password !=="" && email !=="" && repwd !=="" && repwd===password) {
        $("#existuser").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
        insert(name,username,email,password); 
    }   
    return;
}

 function update(){
    var id=$("#myid3").val(),password=$("#mypwd3").val(),name=$("#myname3").val(),email=$("#myemail3").val();
    if(name==="") $("#blank_name3").show(); else $("#blank_name3").hide();
    if(email==="") $("#blank_email3").show(); else $("#blank_email3").hide();
    if(password==="") $("#blank_pwd3").show(); else $("#blank_pwd3").hide();
    if(name !=="" && password !=="" && email !=="") {
        $("#status3").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
        updaterequest(id,name,email,password); 
      
    }
   
    return;
}   