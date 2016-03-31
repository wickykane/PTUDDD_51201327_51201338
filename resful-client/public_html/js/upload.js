window.onload=function(){
     var input = $("#inputFileToLoad");
     input.replaceWith(input.val('').clone(true));
     //Loading user image list
    
}

function encodeImageFileAsURL2() {
   // $("#loading").parent().css({position: 'relative'});
    //$("#loading").css({top: '47%', left: '48%', position: 'absolute'});
    //$("#loading").show();
    //$("#loading").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            localStorage.setItem("imgup",srcData);
            $("#image-upload").attr("src", srcData);
            $("#image-upload").height("334px");
            // $("#image-upload").height($("#upload-box").width());
            // $("#my-profile-image2").width($("#avatar_contain").width());
              // $("#my-profile-image2").height($("#my-profile-image2").width());

        

            //console.log("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
        }
    }
    ;
    fileReader.readAsDataURL(fileToLoad);
}

function uploadimage(){
if( $("#inputFileToLoad").val()==""){    
 alert("Please choose image to upload!!");
 return;
}
 $("#loading").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
  var title= $("#mytitle").val();
  var des = $("#mydes").val();
  var src = localStorage.getItem("imgup");
  if(src==null|| src == "null") {
      alert("Please choose image to upload!!!");
      return;
      
  }
  var item = JSON.parse(localStorage.getItem("myinfo"));
  
  var url = 'http://localhost:8080/restful-java/DoubleH/upload';
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
            alert("Upload Successfully!!!")
        } else if(result==="2") {
                alert("Upload failed!!!")
            
        }
        else {
              alert("Upload failed!!!")
        }
    //var title = getTitle(text);
    //alert('Response from CORS request to ' + url);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(JSON.stringify({   
                         username: item.username,
                         title: title,
                         des: des,
                         image: src 
                         }));
    
}
