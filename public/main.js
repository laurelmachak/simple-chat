// main.js

// send the PUT request when button is clicked
var update = document.getElementById('update');

update.addEventListener('click', function (){
    // send PUT request here
    fetch('sent', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'user',
            'message': 'updated_message'
        })
    }).then(function(res){
        if (res.ok) return res.json()
    }).then(function(data){
        console.log(data)
        window.location.reload(true);
    })
});

var del = document.getElementById('delete');

del.addEventListener('click', function(){
    fetch('sent', {
        method: 'delete',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'name' : 'user'
            
        })
    }).then(function(res){
        if (res.ok) return res.json()
    }).then(function(data){
        console.log(data);
        window.location.reload(true);
    })
})