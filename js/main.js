(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyDLp_SRYgI-pvkZkg6JwYm2vBklrPvY-pw",
        authDomain: "instagramapp-master-db078.firebaseapp.com",
        databaseURL: "https://instagramapp-master-db078.firebaseio.com",
        projectId: "instagramapp-master-db078",
        storageBucket: "instagramapp-master-db078.appspot.com",
        messagingSenderId: "1040735099671",
        appId: "1:1040735099671:web:e7ca6c1d93b900c643f552"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      console.log("Hello");
})()

function donar(){
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var wt = document.getElementById("weight").value;
    var phno = document.getElementById("phone").value;
    var area = document.getElementById("area").value;
    var last = document.getElementById("last").value;
    var grp = document.getElementById("grp");
    var bgrp = grp.options[grp.selectedIndex].value;
    var hab = document.getElementById("habit");
    var habit = hab.options[hab.selectedIndex].value;
    var day = new Date().getDate();
    var mm = new Date().getMonth();
    var yy = new Date().getFullYear();
    console.log(yy);
    console.log(day);
    var mon = mm+1;
    console.log(mon);
    var new1 = last;
    var nmon = new1.substring(0,new1.length-6)
    console.log(parseInt(String(nmon)));
    var a = last.substring(8,last.length);
    console.log(a);
    var mont = String(last[5]).concat(String(last[6]))
    console.log(mont);
    console.log(day-a);
    console.log(mon- mont);
    console.log(mont-mon);
    var root = firebase.database();
   if(yy > parseInt(String(nmon)) && mont-mon<=7){

    root.ref("Donar").child(name).set({
        Name:name,
        Age:age,
        Weight:wt,
        PhoneNumber:phno,
        Area:area,
        LastDonated:last,
        BloodGroup:bgrp,
        Habit:habit
    })
   }
   else if(yy==parseInt(String(nmon)) && (mon-last[6]>=6 || mon-last[6]<-6)){
        root.ref("Donar").child(name).set({
            Name:name,
            Age:age,
            Weight:wt,
            PhoneNumber:phno,
            Area:area,
            LastDonated:last,
            BloodGroup:bgrp,
            Habit:habit
        })
   }
   else if(mon-last[6]<6 || mon-last[6]<-6){
       var res = confirm("You not allowed to enter the data for more information click Ok or Cancel");
       if(res==true){
           window.location.href="http://www.google.com";
       }
   }
   setTimeout(function(){ 
    root.ref("Donar").child(name).once("value").then(function(snap){
        var nam1 = snap.child("Name").val();
        console.log(nam1);
        
        if(nam1==name){
            alert("Data is inserted");
            window.location.href="index.html";
        }  
      })
}, 3000);    
}

function admin(){
    var name = document.getElementById("name").value;
    var Pass = document.getElementById("pass").value;
    firebase.database().ref("Admin").once("value").then(function(snap){
        var username = snap.child("name").val();
        var pass = snap.child("pass").val();
        if(username == name && pass == Pass){
            firebase.database().ref("Donar").once("value").then(function(snap){
                snap.forEach(function(childSnapshot1) {
                    firebase.database().ref("Donar").child(childSnapshot1.key).once("value").then(function(snap){
                        var habit = snap.child("Habit").val();
                        var with = snap.child("Weight").val();
                        let userRef = firebase.database().ref("Donar").child(childSnapshot1.key);
                       
                        if(habit=="Drug" || habit=="Alcohol" || with < 52){
                            userRef.remove();
                            console.log("removed");
                            
                        }
                    })
                })
               
            })
        }
    })
}