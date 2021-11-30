//Function needed to put user data in Dynamo DB after signin up.
function signinUp(){
    const username = document.getElementById('userNameId').value;
    const email = document.getElementById('userEmailId').value;
    const psw = document.getElementById('userPassword').value;

    var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://it0lleyj54.execute-api.us-east-1.amazonaws.com/prcdyophase/userslogin?emailID="+email+"&password="+psw+"&username="+username, true);
        xhttp.send();
        
    alert("Data sent successfully!");
}


//Function to retrieve data from Dynamo DB and allow the user to jump into the app.
function loggingIn(){
										
    //I can login with email and password
    const email = document.getElementById('userEmailId').value;
    const psw = document.getElementById('userPassword').value;

    
    var loginData;
    var mybody = {
            "password": psw,
            "emailID": email
            };
    

    request = $.ajax({
        crossDomain: true,
        url: "https://it0lleyj54.execute-api.us-east-1.amazonaws.com/prcdyophase/loginreal",
        async: false,
        headers: {'Content-Type':'application/json'},
        //contentType: 'application/json;charset=utf-8',
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(mybody)
        });
        
        // Callback handler that will be called on success
        request.done(function (response){
            loginCheck=response.Count;
            if (loginCheck == 0){
                alert("User not found. Try with different parameters!!");
            }else{
                loginData=response.Items[0].username;
                localStorage.setItem("loginData", loginData);
                window.open("app.html");
            }
        });
        
        // Callback handler that will be called on failure
        request.fail(function (errorThrown){
        // Log the error to the console
        console.error(
        "The following error occurred: "+
            JSON.stringify(errorThrown)
        );
        alert("Login function failed!");
        });
    }

//function used to return from the search track    
function searchTrack(){
    var res;
    var data = [];
    var input = $('#search');
    input.focus();
    var search = input.val();
    var jsonbody={
        "stringToSearch": search
    }

        request = $.ajax({
        crossDomain: true,
        url: "https://it0lleyj54.execute-api.us-east-1.amazonaws.com/prcdyophase/searchByKey",
        async: false,
        headers: {'Content-Type':'application/json'},
        //contentType: 'application/json;charset=utf-8',
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(jsonbody)
        //data: mybody
        }); 
        request.done(function(){
        
                    // Callback handler that will be called on success
        res = JSON.parse(request.responseText);
        
        res.forEach(element => {
            
            var tmpJson = {"artist":element.split(" - ")[0],"song":element.split(" - ")[1]};
            
            data.push(tmpJson);
        });

        buildTable(data);
    })
    
        // Callback handler that will be called on failure
        request.fail(function (errorThrown){
        // Log the error to the console
        console.error(
        "The following error occurred: "+
            JSON.stringify(errorThrown)
        );
        alert("SearchTrack() has failed!");
        });
    }    


//function used to get all tracks on page load    
function loadTracks(){
    var res;
    var data = [];

    var jqxhr = $.getJSON( "https://it0lleyj54.execute-api.us-east-1.amazonaws.com/prcdyophase/gettracks", function() {
    })
    .done(function() {
        console.log( "second success" );
        
        res = JSON.parse(jqxhr.responseText);
        
        res.forEach(element => {
            var tmpJson = {"artist":element.split(" - ")[0],"song":element.split(" - ")[1]};
            data.push(tmpJson);
        });

        buildTable(data);
        
    })
    .fail(function() {
        console.log( "Error in getTracks" );
    })
    .always(function() {
        console.log( "getTracks has completed." );
    });
}

    

    //function to play clicked track 
function playTrack(artist, song){
    localStorage.setItem("artistToSearch", artist);
    localStorage.setItem("songToSearch", song);
    window.open("player.html");
};


    
    
//function to download clicked track
function downloadTrack(artist, song){
    var mybody={
        key:artist+" - "+song
    }
    request = $.ajax({
    crossDomain: true,
    url: "https://it0lleyj54.execute-api.us-east-1.amazonaws.com/prcdyophase/trackdownload",
    async: false,
    headers: {'Content-Type':'application/json'},
    //contentType: 'application/json;charset=utf-8',
    contentType: 'application/json',
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify(mybody)
    //data: mybody
    });
    
    // Callback handler that will be called on success
    request.done(function (response){
        downloadUrl=response;
        localStorage.setItem("downloadUrl", downloadUrl);
        window.open(downloadUrl);
        
    });
    
    // Callback handler that will be called on failure
    request.fail(function (errorThrown){
    // Log the error to the console
    console.error(
    "The following error occurred: "+
        JSON.stringify(errorThrown)
    );
    alert("downloadTrack failed!");
    });
}
    
    
    
//javascript function to dynamically build the table in which songs are displayed
function buildTable(data){
    var table = document.getElementById('myTable')
    table.innerHTML=``;

    for (var i = 0; i < data.length; i++){
        
        var row = `<tr>
                        <td style="width:150px;">${data[i].artist}</td>
                        <td style="width:150px;">${data[i].song}</td>
                        <td style="width:30px;"><img src="images/play.png" 
                            onclick="playTrack('${data[i].artist}','${data[i].song}');" style="width:24px;height:24px;" alt="" />
                            <img src="images/download.png" 
                            onclick="downloadTrack('${data[i].artist}','${data[i].song}');" style="width:24px;height:24px;margin-left:10px;" alt="" /></td>
                                
                    </tr>`
        table.innerHTML += row


    }
}







    