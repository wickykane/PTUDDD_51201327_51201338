$.urlParam = function (name, url) {
    if (!url) {
        url = window.location.href;
    }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {
        return undefined;
    }
    return results[1] || undefined;
};

$(window).resize(function () {
    $("#avatar_contain").height($("#avatar_contain").width());
    $("#my-profile-image2").height($("#my-profile-image2").width());
    $(".img-category img").height($(".img-category img").width());
});

function uploadavatar() {

    $("#inputFileToLoad").trigger('click');
}

function updateinforequest() {
    var item = JSON.parse(localStorage.getItem("myinfo"));
    var id = $("#myid3").val(), password = $("#mypwd3").val(), name = $("#myname3").val(), email = $("#myemail3").val(), repwd = $("#myrepwd3").val();
    if (name === "")
        $("#blank_name3").show();
    else
        $("#blank_name3").hide();
    if (email === "")
        $("#blank_email3").show();
    else
        $("#blank_email3").hide();
    if (password === "")
        $("#blank_pwd3").show();
    else
        $("#blank_pwd3").hide();
    if (repwd === "")
        $("#blank_repwd3").show();
    else
        $("#blank_repwd3").hide();
    if (password !== repwd)
        $("#dontmatch3").show();
    else
        $("#dontmatch3").hide();
    if (name !== "" && password !== "" && email !== "" && repwd !== "" && repwd === password) {
        $("#status3").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
        // All HTML5 Rocks properties support CORS.
        var url = 'http://localhost:8080/restful-java/DoubleH/update';
        var xhr = createCORSRequest('PUT', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }
        // Response handlers.
        xhr.onload = function () {
            var result = xhr.responseText;
            if (result === "1") {

                $("#status3").html("Update successfully!!!");

            } else if (result === "2") {
                $("#status3").html("Username has existed!!!");

            } else {
                $("#status3").html("There is an error. Please try again!!!");
            }
            //var title = getTitle(text);
            //alert('Response from CORS request to ' + url);
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        var newjson = {
            email: email,
            floatX: 0,
            floatY: 0,
            id: item.id,
            password: password,
            status: 1,
            name: name,
            image: item.image
        }
        xhr.send(JSON.stringify(newjson));
        localStorage.setItem("myinfo", JSON.stringify(newjson));
        $("#myname").html(name);
        $("#myemail").html(email);

    }

}

function editprofile() {
    var item = JSON.parse(localStorage.getItem("myinfo"));
    $("#myname3").val(item.name);
    $("#myusername3").val(item.username);
    $("#myemail3").val(item.email);
    $("#mypwd3").val(item.password);
    $("#myid3").val(item.id);
    return;

}

function encodeImageFileAsURL() {
    $("#loading").parent().css({position: 'relative'});
    $("#loading").css({top: '47%', left: '48%', position: 'absolute'});
    $("#loading").show();
    $("#loading").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            //$("#my-profile-image2").attr("src", srcData);
            $("#avatar_contain").height($("#avatar_contain").width());
            // $("#my-profile-image2").width($("#avatar_contain").width());
            $("#my-profile-image2").height($("#my-profile-image2").width());

            //read data json
            var json = JSON.parse(localStorage.getItem("myinfo"));
            var url = 'http://localhost:8080/restful-java/DoubleH/update';
            var xhr = createCORSRequest('PUT', url);
            if (!xhr) {
                alert('CORS not supported');
                return;
            }
            // Response handlers
            xhr.onload = function () {
                var text = xhr.responseText;
                //var title = getTitle(text);
                //alert('Response from CORS request: ' + text);
                $("#loading").html("");
                $(".my-profile-image").attr("src", srcData);
            };

            xhr.onerror = function () {
                alert('Woops, there was an error making the request.');
            };
            xhr.setRequestHeader('Content-Type', 'application/json');
            var newjson = JSON.stringify({
                email: json.email,
                floatX: 0,
                floatY: 0,
                id: json.id,
                name: json.name,
                password: json.password,
                status: 1,
                username: json.username,
                image: srcData
            });
            xhr.send(newjson);
            localStorage.setItem("myinfo", newjson);
            localStorage.setItem("myavatar", srcData);

            //console.log("Converted Base64 version is "+document.getElementById("imgTest").innerHTML);
        }
    }
    ;
    fileReader.readAsDataURL(fileToLoad);
}
function deleteimage(dom){
    $("#loading2").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
    var item = JSON.parse(localStorage.getItem("myinfo"));
    var myid = dom.parentNode.id;
    myid=parseInt(myid.substring(6,myid.length));
   // alert(myid);
     var url = 'http://localhost:8080/restful-java/DoubleH/deleteimage';
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onload = function() {
    var result = xhr.responseText;
    if(result === '1')  loadlistimage();
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.send(JSON.stringify({
                         id: myid,
                         username: item.username
                         }));
}
function loadlistimage() {
    $("#loading2").html("<i class='fa fa-spinner fa-spin fa-2x'></i>");
    var item = JSON.parse(localStorage.getItem("myinfo"));
    if (item == null)
        return;
    var url = 'http://localhost:8080/restful-java/DoubleH/getimage';
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    // Response handlers.
    xhr.onload = function () {
        var result = xhr.responseText;
        result = JSON.parse(result);
        var append = "";
        var row = '<div id="list-image" class="category-custom-list">';
        var endrow = '</div>';
        for (var i = 0; i < result.length; i++) {
            var id = "image_" + result[i].id.toString();
            //  alert(item);
            if (i + 1 % 4 == 0)
                append += row;
                append = append + '<div class="category-responsive-pc"><div class="img-category"><div>';
                append = append + '<img src="' + result[i].image + '" alt="">';
                append = append + '<div  class="profile-stats-info img-upload  text-right" id="'+ id+'" ><a onclick="deleteimage(this);" href="javascript:void(0)" title="Delete"><i class="fa fa-trash fa-2x"></i></a>';
                append = append + '</div></div></div></div>';
            if (i + 1 % 4 == 0)
                append += endrow;


        }
         $("#list-contain").html("");
        $("#list-contain").append(append);
        $("#loading2").html("");
        $(".img-category img").height($(".img-category img").width());

    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        username: item.username
    }));

}

$(document).ready(function () {
    
    $("#inputFileToLoad").css('opacity', '0');
    $("#avatar_contain").height($("#avatar_contain").width());
    $("#my-profile-image2").height($("#my-profile-image2").width());
    // alert( $.urlParam('id'));
    var json = JSON.parse(localStorage.getItem("myinfo"));
    // alert(json);
    //console.log(JSON.parse(json)); 
    loadlistimage();
    if (json !== null)
    {
        $("#myusername").html(json.username);
        $("#myname").html(json.name);
        $("#myemail").html(json.email);
        $(".my-profile-image").attr("src", json.image);
        return;

    }

});

$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-primary");
});


$("#btn-logout").on("click", function () {
    var avatar = localStorage.getItem("myavatar");
    localStorage.clear();
    localStorage.setItem("myavatar", avatar);
    location.href = "home.html";
});


