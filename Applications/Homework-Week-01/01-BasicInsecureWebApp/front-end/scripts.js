// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getPosts() {
    let list = document.getElementById("post-list");
    list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/post`, function(data) {
        data.data.forEach((post) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-postid='${post.id}' data-postusername='${post.username}' data-postdescription='${post.description}' onclick='editPost(event)'>edit</a>`;
            let del = `<a href='#' data-postid='${post.id}' onclick='delPost(event)'>delete</a>`;
            newElement.innerHTML = `${post.id} UserName: ${post.username} Description: ${post.description} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addPost(e) {
    e.preventDefault();
    let username = $("#username");
    let description = $("#description");
    let postid = $("#postid");

    let usernameVal = username.val();
    let descriptionVal = description.val();

    if(username == "" || description == "") {
        alert('UserName and Description cannot be blank');
        return;
    }

    if (+postid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/post`, { username: usernameVal, description: descriptionVal }, function(data) {
            getPosts();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/post/${postid.val()}`,
                data: { post: username.val(), description: description.val() }
            })
            .done(function(msg) {
                getPosts();
            });
    }

    postid.val(0);
    $("#post-submit").val('Add Post');
    username.val("");
    description.val("");
}

function editPost(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let username = $("#username");
    let description = $("#description");
    let id = $("#postid");

    let usernameVal = el.data("postusername");
    let descriptionVal = el.data("postdescription");
    let idVal = el.data("postid");

    console.log(id);

    $("#post-submit").val(`Edit Post #${idVal}`);
    username.val(usernameVal);
    description.val(descriptionVal);
    id.val(idVal);
}

function delPost(e) {
    e.preventDefault();

    let el = $(e.srcElement);
    let postid = el.data("postid");
    if(confirm(`Are you sure you want to delete Post #${postid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/post/${postid}`
            })
            .done(function(msg) {
                getPosts();
            });
    }
}


// run getPosts on
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getPosts();
    $("#add-post").on('submit', addPost);

});
